import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Member } from "./Member";
import { Room } from "./Room";

@ObjectType()
@Entity("teams")
export class Team extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text", unique: true })
  name: string;

  @Field()
  @Column({ type: "bool", default: false })
  isPublic: boolean;

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
}
