import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";

import { MyContext } from "../../types/MyContext";
import { Request } from "../../entity/Request";
import { User } from "../../entity/User";

@Resolver(Request)
export default class RequestResolver {
  @FieldResolver()
  async sender(@Root() req: Request) {
    return await User.findOne(req.senderId);
  }

  @FieldResolver()
  async receiver(@Root() req: Request) {
    return await User.findOne(req.receiverId);
  }

  @FieldResolver()
  async isSender(@Root() re: Request, @Ctx() { req }: MyContext) {
    const userId = (req.session as any).userId;
    if (userId !== re.senderId) {
      return false;
    }
    return true;
  }

  @Query(() => [Request])
  async requests(@Ctx() { req }: MyContext) {
    const userId = (req.session as any).userId;

    return await getConnection().query(
      `
      select * from requests  r left join users u on u."id"=r."senderId" where
      r."receiverId"= $1
      union select * from requests  r left join users u on u."id"=r."receiverId" where
      r."senderId"=$1 
    `,
      [userId]
    );
  }

  @Mutation(() => Boolean)
  async createRequest(
    @Arg("receiverId") receiverId: number,
    @Ctx() { req }: MyContext
  ) {
    const senderId = (req.session as any).userId;

    try {
      await Request.create({
        receiverId,
        senderId,
      }).save();
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
