import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity("friends")
export class Friend extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  friendId: number;

  @ManyToOne(() => User, (u) => u.friends, { onDelete: "CASCADE" })
  @JoinColumn({ name: "friendId" })
  friendRel: User;

  @Field()
  @Column()
  userId: number;

  @Field(() => User)
  friend: User;

  @Field(() => Boolean)
  isUser: boolean;

  @Field(() => User)
  user: User;

  @ManyToOne(() => User, (u) => u.user, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  userRel: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
