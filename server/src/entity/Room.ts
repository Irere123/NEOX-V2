import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { User } from "./User";
import { Team } from "./Team";
import { PRMember } from "./PRMember";

@ObjectType()
@Entity("rooms")
export class Room extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "text" })
  name: string;

  @Field()
  @Column({ type: "bool", default: false })
  public: boolean;

  @Field()
  @Column({ type: "bool", default: false })
  dm: boolean;

  @Field()
  @Column()
  teamId: string;

  @Field(() => String)
  @CreateDateColumn({ type: "text" })
  createdAt: Date;

  @OneToMany(() => RMember, (rm) => rm.room, { onDelete: "CASCADE" })
  members: RMember[];

  @OneToMany(() => PRMember, (cm) => cm.room, { onDelete: "CASCADE" })
  prmembers: PRMember[];

  @ManyToOne(() => Team, (t) => t.roomsRel, { onDelete: "CASCADE" })
  @JoinColumn({ name: "teamId" })
  team: Team;
}

@Entity("room_members")
export class RMember {
  @Field(() => Int)
  @PrimaryColumn()
  roomId: number;

  @ManyToOne(() => Room, (c) => c.members)
  @JoinColumn({ name: "roomId" })
  room: Room;

  @Field(() => Int)
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.rooms)
  @JoinColumn({ name: "userId" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
