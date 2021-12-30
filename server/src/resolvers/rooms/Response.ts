import { Field, ObjectType } from "type-graphql";

import { FieldError } from "../shared/error";
import { Room } from "../../entity/Room";

@ObjectType()
export class RoomResponse {
  @Field()
  ok?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Room, { nullable: true })
  room?: Room;
}
