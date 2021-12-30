import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Member } from "./Member";
import { Room } from "./Room";
import { User } from "./User";

@ObjectType()
@Entity("teams")
export class Team extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text" })
  name: string;

  @Field()
  @Column({ type: "bool", default: false })
  isPublic: boolean;

  @Field(() => Boolean)
  isAdmin: Boolean;

  @Field(() => [Room])
  rooms: Room[];

  @Field(() => String)
  @CreateDateColumn({ type: "text" })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "text" })
  updatedAt: Date;

  @OneToMany(() => Member, (m) => m.teams, { onDelete: "CASCADE" })
  members: Member[];

  @OneToMany(() => Room, (c) => c.team, { onDelete: "CASCADE" })
  roomsRel: Room[];

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.teamRel, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;
}
