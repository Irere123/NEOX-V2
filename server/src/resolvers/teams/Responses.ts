import { Field, ObjectType } from "type-graphql";

import { Team } from "../../entity/Team";
import { FieldError } from "../shared/error";

@ObjectType()
export class TeamResponse {
  @Field()
  ok?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Team, { nullable: true })
  team?: Team;
}

@ObjectType()
export class addMemberResponse {
  @Field()
  ok?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class TransferTeamResponse {
  @Field()
  ok?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
