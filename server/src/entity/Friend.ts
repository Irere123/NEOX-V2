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
  friend: User;

  @Field()
  @Column()
  userId: number;

  @ManyToOne(() => User, (u) => u.user, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
