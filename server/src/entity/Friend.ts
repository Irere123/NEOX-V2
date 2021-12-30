import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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
  @Column({ unique: true })
  friendId: number;

  @ManyToOne(() => User, (u) => u.friends, { onDelete: "CASCADE" })
  @JoinColumn({ name: "friendId" })
  friend: User;

  @Field()
  @Column()
  userId: number;

  @OneToOne(() => User, (u) => u.user, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
