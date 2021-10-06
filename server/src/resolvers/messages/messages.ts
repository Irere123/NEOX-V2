import {
  Arg,
  Mutation,
  Resolver,
  Root,
  Subscription,
  PubSub,
  PubSubEngine,
} from "type-graphql";

import { Message } from "../../entity/Message";

@Resolver(Message)
export default class MessageResolver {
  @Subscription(() => Message, { topics: "NEW_MESSAGE" })
  newMessage(@Root() payload: Message) {
    return payload;
  }

  @Mutation(() => Boolean)
  async createMessage(
    @Arg("text") text: string,
    @PubSub() pubsub: PubSubEngine
  ): Promise<Boolean> {
    const message = await Message.create({
      text,
    }).save();

    pubsub.publish("NEW_MESSAGE", message);
    return true;
  }
}
