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
import { Room } from "./Room";
import { User } from "./User";

@Entity("prmembers")
export class PRMember extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (c) => c.PRooms, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  members: Room;

  @Column()
  roomId: string;

  @ManyToOne(() => Room, (c) => c.prmembers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "roomId" })
  room: Room;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
