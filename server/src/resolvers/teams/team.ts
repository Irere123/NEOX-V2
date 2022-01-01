import { MyContext } from "../../types/MyContext";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  Root,
  FieldResolver,
  Int,
  UseMiddleware,
  ID,
} from "type-graphql";
import { getConnection } from "typeorm";

import { Team } from "../../entity/Team";
import { User } from "../../entity/User";
import { Member } from "../../entity/Member";
import { Room } from "../../entity/Room";
import {
  addMemberResponse,
  TeamResponse,
  TransferTeamResponse,
} from "./Responses";
import { isAuth } from "../../utils/isAuth";
import {
  friendsTemplate,
  schoolClubTemplate,
  studyGroupTemplate,
} from "./teamTemplates";

@Resolver(Team)
export default class TeamsResolver {
  @Query(() => [Team])
  teams() {
    return Team.find();
  }

  @Mutation(() => TeamResponse)
  @UseMiddleware(isAuth)
  async createTeamByTemplate(
    @Arg("template") template: string,
    @Arg("name") name: string,
    @Ctx() { req }: MyContext
  ) {
    const userId = (req.session as any).userId;
    const uTeamNum = await Team.count({ where: { userId } });

    if (uTeamNum === 5) {
      return {
        ok: false,
        errors: [
          {
            field: "name",
            message:
              "You can not create more teams. You need to upgrade to nitro to create more teams",
          },
        ],
      };
    }

    if (name === "") {
      return {
        ok: false,
        errors: [
          {
            field: "name",
            message: "You must provide the team name",
          },
        ],
      };
    }

    let team;

    if (template === "study_group") {
      team = await studyGroupTemplate(name, userId);
    } else if (template === "school_club") {
      team = await schoolClubTemplate(name, userId);
    } else if (template === "friends") {
      team = friendsTemplate(name, userId);
    }

    return {
      ok: true,
      team,
    };
  }

  @Query(() => Team, { nullable: true })
  @UseMiddleware(isAuth)
  async team(
    @Arg("teamId", () => ID) teamId: string,
    @Ctx() { req }: MyContext
  ): Promise<Team | null | unknown> {
    const userId = (req.session as any).userId;
    const team = await getConnection()
      .createQueryBuilder("teams", "t")
      .innerJoinAndSelect("t.members", "m")
      .where("m.teamId=:teamId", { teamId })
      .andWhere("m.userId=:userId", { userId })
      .getOne();

    if (!team) {
      return null;
    }

    return team;
  }

  @Query(() => [Team])
  publicTeams() {
    return Team.find({ where: { isPublic: true } });
  }

  @FieldResolver(() => [Room])
  async rooms(@Root() team: Team) {
    const rooms = await Room.find({ where: { teamId: team.id } });

    return rooms;
  }

  @FieldResolver(() => Boolean)
  async isAdmin(@Root() team: Team, @Ctx() { req }: MyContext) {
    const userId = (req.session as any).userId;
    const user = await Member.findOne({
      where: { userId, teamId: team.id, admin: true },
    });

    if (!user) {
      return false;
    }

    return true;
  }

  @Query(() => [User])
  async getTeamMembers(@Arg("teamId", () => ID) id: string) {
    const members = await getConnection().query(
      `
      select * from members as m join users as u on m."userId" = u.id
      where m."teamId" = $1
     `,
      [id]
    );

    return members;
  }

  @Mutation(() => TeamResponse)
  @UseMiddleware(isAuth)
  async createTeam(
    @Arg("name") name: string,
    @Arg("public", { nullable: true }) isPublic: boolean,
    @Ctx() { req }: MyContext
  ): Promise<TeamResponse> {
    const userId = (req.session as any).userId;
    const uTeamNum = await Team.count({ where: { userId } });

    if (uTeamNum === 5) {
      return {
        ok: false,
        errors: [
          {
            field: "name",
            message:
              "You can not create more teams. You need to upgrade to create more teams",
          },
        ],
      };
    }

    if (name === "") {
      return {
        ok: false,
        errors: [
          {
            field: "name",
            message: "You must provide the team name",
          },
        ],
      };
    }

    let team;

    try {
      await getConnection().transaction(async () => {
        team = await Team.create({ name, isPublic, userId }).save();
        await Member.create({ admin: true, userId, teamId: team.id }).save();
        await Room.create({
          rules: true,
          teamId: team.id,
          name: "welcome-and-rules",
        }).save();

        await Room.create({
          ann: true,
          teamId: team.id,
          name: "announcements",
        }).save();

        await Room.create({
          teamId: team.id,
          name: "off-topic",
        }).save();

        await Room.create({
          teamId: team.id,
          name: "general",
        }).save();

        await Room.create({
          dm: false,
          teamId: team.id,
          name: "random",
        }).save();
      });
    } catch (error) {
      console.log(error);
    }

    return {
      ok: true,
      team,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteTeam(@Arg("teamId", () => ID) id: string) {
    const team = await Team.findOne(id);

    if (!team) {
      return false;
    }

    await Team.delete({ id });
    return true;
  }

  @Mutation(() => TeamResponse)
  @UseMiddleware(isAuth)
  async updateTeam(
    @Arg("teamId", () => ID) id: string,
    @Arg("name") name: string,
    @Arg("public") isPublic: boolean
  ): Promise<TeamResponse> {
    const team = await getConnection()
      .createQueryBuilder()
      .update(Team)
      .set({ name, isPublic })
      .where("id=:id", { id })
      .returning("*")
      .execute();

    return {
      ok: true,
      team: team.raw[0],
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async leaveTeam(
    @Arg("teamId", () => ID) teamId: string,
    @Ctx() { req }: MyContext
  ) {
    const userId = (req.session as any).userId;
    const member = await Member.findOne({ where: { userId, teamId } });

    if (!userId) {
      return false;
    } else if (!member) {
      return false;
    }

    await Member.delete({ userId });

    return true;
  }

  @Mutation(() => addMemberResponse)
  @UseMiddleware(isAuth)
  async addTeamMember(
    @Arg("userId") userIdArg: string,
    @Arg("teamId", () => ID) teamId: string,
    @Ctx() { req }: MyContext
  ): Promise<addMemberResponse> {
    const userId = (req.session as any).userId;

    try {
      const memberPromise = Member.findOne({
        where: { teamId, userId },
      });

      const userToAddPromise = User.findOne({ where: { id: userIdArg } });

      const [member, userToAdd] = await Promise.all([
        memberPromise,
        userToAddPromise,
      ]);

      if (!member?.admin) {
        return {
          ok: false,
          errors: [
            {
              field: "username",
              message: "You can not add members to this team.",
            },
          ],
        };
      }

      if (!userToAdd) {
        return {
          ok: false,
          errors: [
            {
              field: "username",
              message: "User with that username is not found.",
            },
          ],
        };
      }

      await Member.create({
        userId: userToAdd.id,
        teamId,
      }).save();
    } catch (error) {
      console.log(error);
    }

    return {
      ok: true,
    };
  }

  @Mutation(() => TransferTeamResponse)
  @UseMiddleware(isAuth)
  async transferTeam(
    @Arg("teamId", () => ID) teamId: string,
    @Arg("receiverId", () => Int) receiverId: number,
    @Ctx() { req }: MyContext
  ): Promise<TransferTeamResponse> {
    const userId = (req.session as any).userId;
    const receiver = await User.findOne(receiverId);
    const isSenderAdmin = await Member.findOne({
      where: { userId, admin: true, teamId },
    });

    if (!receiver) {
      return {
        ok: false,
        errors: [
          {
            field: "username",
            message: "The user you trying to give the team does not exist.",
          },
        ],
      };
    }

    if (!isSenderAdmin) {
      return {
        ok: false,
        errors: [
          {
            field: "username",
            message: "You can not transfer this team.",
          },
        ],
      };
    }

    try {
      await getConnection().transaction(async (transaction) => {
        const isMember = await Member.findOne({
          where: { teamId, userId: receiver.id },
        });
        if (!isMember) {
          await Member.create({
            admin: true,
            teamId,
            userId: receiver.id,
          }).save();
          await Member.update(
            { admin: true, userId, teamId },
            { admin: false }
          );
        } else if (isMember) {
          const memberToDegrade = transaction.update(
            Member,
            { admin: true, userId, teamId },
            { admin: false }
          );
          const memberToUpgrade = transaction.update(
            Member,
            { admin: false, userId: receiver.id, teamId },
            { admin: true }
          );

          await Promise.all([memberToDegrade, memberToUpgrade]);
        }
      });
    } catch (err) {
      console.log(err);
      return {
        ok: false,
      };
    }

    return {
      ok: true,
    };
  }
}
