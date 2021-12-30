import {
  Entity,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { Team } from "./Team";

// m:m
//  users -->  member(Join table) <--- teams
// many users have many teams
// team have many users

@ObjectType()
@Entity("members")
export class Member extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "bool", default: false })
  admin: boolean;

  @Field()
  @Column({ type: "varchar", default: "basic" })
  role: boolean;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.teamsRel, { onDelete: "CASCADE" })
  user: User;

  @Column()
  teamId: string;

  @ManyToOne(() => Team, (t) => t.members, { onDelete: "CASCADE" })
  @JoinColumn({ name: "teamId" })
  teams: Team[];
}
