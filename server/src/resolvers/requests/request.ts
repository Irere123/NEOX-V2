import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";

import { MyContext } from "../../types/MyContext";
import { Request } from "../../entity/Request";
import { User } from "../../entity/User";
import { GlobalResponse } from "./Responses";
import { Friend } from "../../entity/Friend";

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
      (r."receiverId"= $1) and (r."canceled"=false and r."accepted"=false)
      union select * from requests  r left join users u on u."id"=r."receiverId" where
      (r."senderId"=$1) and (r."canceled"=false and r."accepted"=false) 
    `,
      [userId]
    );
  }

  @Mutation(() => GlobalResponse)
  async createRequest(
    @Arg("receiverId") receiverId: number,
    @Ctx() { req }: MyContext
  ): Promise<GlobalResponse> {
    const senderId = (req.session as any).userId;
    let reqDB1;
    let reqDB2;
    let f1;
    let f2;
    await getConnection().transaction(async () => {
      reqDB1 = await Request.findOne({ where: { receiverId, senderId } });
      reqDB2 = await Request.findOne({
        where: { receiverId: senderId, senderId: receiverId },
      });
    });
    await getConnection().transaction(async () => {
      f1 = await Friend.findOne({
        where: { friendId: receiverId, userId: senderId },
      });
      f2 = await Friend.findOne({
        where: { friendId: senderId, userId: receiverId },
      });
    });

    if (reqDB1 || reqDB2) {
      return {
        ok: false,
        errors: [{ field: "name", message: "You've already sent it..." }],
      };
    }

    if (f1 || f2) {
      return {
        ok: false,
        errors: [{ field: "name", message: "You're already friends.." }],
      };
    }

    if (receiverId === senderId) {
      return {
        ok: false,
        errors: [
          {
            field: "name",
            message: "You can not send a request to your self..",
          },
        ],
      };
    }

    try {
      await Request.create({
        receiverId,
        senderId,
      }).save();
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

  @Mutation(() => GlobalResponse)
  async deleteCanceledRequest(): Promise<GlobalResponse> {
    await Request.delete({ canceled: true });

    return {
      ok: true,
    };
  }

  @Mutation(() => GlobalResponse)
  async deleteAcceptedRequest(): Promise<GlobalResponse> {
    await Request.delete({ accepted: true });

    return {
      ok: true,
    };
  }

  @Mutation(() => GlobalResponse)
  async updateAcceptRequest(
    @Arg("id", () => Int) id: number,
    @Arg("value") value: boolean
  ): Promise<GlobalResponse> {
    await Request.update({ id }, { accepted: value });

    return {
      ok: true,
    };
  }

  @Mutation(() => GlobalResponse)
  async updateCancelRequest(
    @Arg("id", () => Int) id: number,
    @Arg("value") value: boolean
  ): Promise<GlobalResponse> {
    await Request.update({ id }, { canceled: value });

    return {
      ok: true,
    };
  }
}
