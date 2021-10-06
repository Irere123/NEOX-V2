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

@Resolver(Team)
export default class TeamsResolver {
  @Query(() => [Team])
  teams() {
    return Team.find();
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

  @Query(() => [User])
  async getTeamMembers(@Arg("teamId", () => ID) id: string) {
    const members = await getConnection().query(
      `
      select * from users as u join members as m on m."userId" = u.id
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
    const dbTeam = await Team.findOne({ where: { name } });

    if (dbTeam) {
      return {
        ok: false,
        errors: [
          {
            field: "name",
            message: "The name is already taken",
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
        team = await Team.create({ name, isPublic }).save();
        await Member.create({ admin: true, userId, teamId: team.id }).save();

        await Room.create({
          dm: false,
          public: true,
          teamId: team.id,
          name: "general",
        }).save();

        await Room.create({
          dm: false,
          public: isPublic,
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
    @Arg("username") username: string,
    @Arg("teamId", () => ID) teamId: string,
    @Ctx() { req }: MyContext
  ): Promise<addMemberResponse> {
    const userId = (req.session as any).userId;

    if (username === "") {
      return {
        ok: false,
        errors: [
          {
            field: "username",
            message: "You must provide the username",
          },
        ],
      };
    }

    if (teamId === undefined) {
      return {
        ok: false,
        errors: [
          {
            field: "username",
            message: "You must provide the username",
          },
        ],
      };
    }

    try {
      const memberPromise = Member.findOne({
        where: { teamId, userId },
      });

      const userToAddPromise = User.findOne({ where: { username } });

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