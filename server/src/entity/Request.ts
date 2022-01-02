import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity("requests")
export class Request extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "bool", default: false })
  accepted: boolean;

  @Field()
  @Column()
  receiverId: number;

  @ManyToOne(() => User, (u) => u.receiver, { onDelete: "CASCADE" })
  @JoinColumn({ name: "receiverId" })
  receiver: User;

  @Field()
  @Column()
  senderId: number;

  @ManyToOne(() => User, (u) => u.sender, { onDelete: "CASCADE" })
  @JoinColumn({ name: "senderId" })
  sender: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
