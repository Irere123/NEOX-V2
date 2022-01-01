import {
  Arg,
  Mutation,
  Resolver,
  Root,
  Subscription,
  PubSub,
  PubSubEngine,
  Ctx,
  Int,
  Query,
  FieldResolver,
} from "type-graphql";
import { User } from "../../entity/User";

import { Message } from "../../entity/Message";
import { MyContext } from "../../types/MyContext";

const NEW_ROOM_MESSAGE = "NEW_ROOM_MESSAGE";

@Resolver(Message)
export default class MessageResolver {
  @Subscription(() => Message, {
    topics: NEW_ROOM_MESSAGE,
    filter: ({ args, payload }) => payload.roomId === args.roomId,
  })
  newMessage(
    @Root() payload: Message,
    @Arg("roomId", () => Int) _roomId: number
  ) {
    return payload;
  }

  @FieldResolver(() => User)
  user(@Root() message: Message) {
    const user = User.findOne({ where: { id: message.userId } });
    return user;
  }

  @Query(() => [Message])
  async messages(@Arg("roomId", () => Int) roomId: number): Promise<Message[]> {
    const messages = await Message.find({ where: { roomId } });
    return messages;
  }

  @Mutation(() => Boolean)
  async createMessage(
    @Arg("roomId", () => Int) roomId: number,
    @Arg("text") text: string,
    @PubSub() pubsub: PubSubEngine,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const userId = (req.session as any).userId;
    let message;

    try {
      message = await Message.create({
        roomId,
        userId,
        text,
      }).save();
    } catch (err) {
      console.log(err);
      return false;
    }

    pubsub.publish(NEW_ROOM_MESSAGE, message);
    return true;
  }
}
