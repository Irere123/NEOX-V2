import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
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

  @Field(() => User)
  sender: User;

  @Field(() => User)
  receiver: User;

  @Field(() => Boolean)
  isSender: boolean;

  @Field()
  @Column()
  receiverId: number;

  @ManyToOne(() => User, (u) => u.receiver, { onDelete: "CASCADE" })
  @JoinColumn({ name: "receiverId" })
  receiverRel: User;

  @Field()
  @Column()
  senderId: number;

  @ManyToOne(() => User, (u) => u.sender, { onDelete: "CASCADE" })
  @JoinColumn({ name: "senderId" })
  senderRel: User;
}
