import { Field, ObjectType } from "type-graphql";

import { User } from "../../entity/User";
import { FieldError } from "../shared/error";

@ObjectType()
export class UserResponse {
  @Field()
  ok?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User | null;
}
