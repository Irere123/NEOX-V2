import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
  PubSub,
  PubSubEngine,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";

import { MyContext } from "../../types/MyContext";
import { Request } from "../../entity/Request";
import { User } from "../../entity/User";
import { GlobalResponse } from "./Responses";
import { Friend } from "../../entity/Friend";

const NEW_REQUEST = "NEW_REQUEST";

@Resolver(Request)
export default class RequestResolver {
  @Subscription(() => Request, { topics: NEW_REQUEST })
  newRequest(@Root() payload: Request) {
    return payload;
  }

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

    const requests = await getConnection().query(
      `
      select * from users  u left join requests r on u."id"=r."senderId" where
      r."receiverId"= $1 and r."accepted"=false
      union select * from users  u left join requests r on u."id"=r."receiverId" where
      r."senderId"=$1 and r."accepted"=false 
    `,
      [userId]
    );

    return requests;
  }

  @Mutation(() => GlobalResponse)
  async createRequest(
    @Arg("receiverId") receiverId: number,
    @PubSub() pubsub: PubSubEngine,
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

    let request;

    try {
      request = await Request.create({
        receiverId,
        senderId,
      }).save();
    } catch (err) {
      console.log(err);
      return {
        ok: false,
      };
    }

    pubsub.publish(NEW_REQUEST, request);
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
  async CancelRequest(
    @Arg("id", () => Int) id: number
  ): Promise<GlobalResponse> {
    const req = await Request.findOne(id);

    if (!req) {
      return {
        ok: false,
        errors: [
          {
            field: "name",
            message: "Request not found",
          },
        ],
      };
    }
    await Request.delete({ id });

    return {
      ok: true,
    };
  }
}
