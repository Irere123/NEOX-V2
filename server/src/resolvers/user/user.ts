import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";

import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { isAuth } from "../../utils/isAuth";
import { Team } from "../../entity/Team";
import { Friend } from "../../entity/Friend";

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  @UseMiddleware(isAuth)
  allUsers(): Promise<User[]> {
    return User.find();
  }

  @FieldResolver(() => [Team])
  async teams(@Ctx() { req }: MyContext) {
    const userId = (req.session as any).userId;
    const teams = await getConnection().query(
      `
    select * from members as m join teams as t on t."id" = m."teamId"  where m."userId" = $1
    `,
      [userId]
    );

    return teams;
  }

  @FieldResolver(() => [User])
  async myFriends(@Ctx() { req }: MyContext) {
    const userId = (req.session as any).userId;

    return await getConnection().query(
      `select * from users as u join friends as f on f."friendId" = u."id"
       where f."userId" = $1`,
      [userId]
    );
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    const userId = (req.session as any).userId;

    if (!userId) {
      return undefined;
    }

    return await User.findOne(userId);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("userId", () => Int) id: number): Promise<Boolean> {
    const user = await User.findOne(id);

    if (!user) {
      return false;
    }

    await User.delete({ id });
    return true;
  }

  @Mutation(() => Boolean)
  async addFriend(
    @Arg("friendId", () => Int) friendId: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const userId = (req.session as any).userId;

    try {
      await Friend.create({
        friendId,
        userId,
      }).save();
    } catch (err) {
      console.log(err);
    }

    return true;
  }

  @Mutation(() => Boolean)
  async removeFriend(
    @Arg("friendId", () => Int) friendId: number
  ): Promise<Boolean> {
    await Friend.delete({ friendId });

    return true;
  }

  @Query(() => [User])
  async usersToBeFriend(@Ctx() { req }: MyContext): Promise<User[]> {
    const userId = (req.session as any).userId;

    const friends = await Friend.find({
      where: { userId },
      select: ["friendId"],
    });

    const users = getConnection().query(
      `
      select * from users as u where u."id" not in (${friends
        .map((u) => `${u.friendId}`)
        .join(",")}) or u."id"=$1
    `,
      [userId]
    );

    return users;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session.destroy((error) => {
        if (error) {
          console.log(error);
          return rej(false);
        }

        ctx.res.clearCookie("qid");
        return res(true);
      })
    );
  }
}
