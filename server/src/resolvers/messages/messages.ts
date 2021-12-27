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

@Resolver(Message)
export default class MessageResolver {
  @Subscription(() => Message, { topics: "NEW_MESSAGE" })
  newMessage(@Root() payload: Message) {
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
      await Message.create({
        roomId,
        userId,
        text,
      }).save();
    } catch (err) {
      console.log(err);
      return false;
    }

    pubsub.publish("NEW_MESSAGE", message);
    return true;
  }
}
