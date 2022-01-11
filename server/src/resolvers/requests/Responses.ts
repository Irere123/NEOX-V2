import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../shared/error";

@ObjectType()
export class GlobalResponse {
  @Field()
  ok?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
