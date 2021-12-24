import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Member } from "./Member";
import { Team } from "./Team";
import { RMember } from "./Room";
import { PRMember } from "./PRMember";
import { Friend } from "./Friend";
import { Message } from "./Message";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "text", unique: true })
  username: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  email: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ type: "text", nullable: true })
  githubId: string;

  @Column({ type: "text", nullable: true })
  googleId: string;

  @Column({ type: "text", nullable: true })
  facebookId: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  pictureUrl: string;

  @Field(() => [Team])
  teams: Team[];

  @Field(() => [User])
  myFriends: User[];

  @Field(() => String)
  @CreateDateColumn({ type: "text" })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "text" })
  updatedAt: Date;

  @OneToMany(() => Member, (t) => t.teams, { onDelete: "CASCADE" })
  teamsRel: Member[];

  @OneToMany(() => Message, (t) => t.user, { onDelete: "CASCADE" })
  msgsRel: Message[];

  @OneToMany(() => RMember, (t) => t.user, { onDelete: "CASCADE" })
  rooms: RMember[];

  @OneToMany(() => PRMember, (t) => t.members, { onDelete: "CASCADE" })
  PRooms: PRMember[];

  @OneToMany(() => Friend, (t) => t.friend, { onDelete: "CASCADE" })
  friends: Friend[];

  @OneToMany(() => Friend, (t) => t.user, { onDelete: "CASCADE" })
  user: Friend[];
}
