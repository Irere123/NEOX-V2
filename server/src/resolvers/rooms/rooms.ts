import {
  Arg,
  Ctx,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import { Room } from "../../entity/Room";
import { RoomResponse } from "./Response";
import { Member } from "../../entity/Member";
import { MyContext } from "../../types/MyContext";
import { isAuth } from "../../utils/isAuth";
import { getConnection } from "typeorm";

@Resolver(Room)
export default class RoomsReolver {
  @Query(() => [Room])
  @UseMiddleware(isAuth)
  rooms() {
    return Room.find();
  }

  @Mutation(() => RoomResponse)
  @UseMiddleware(isAuth)
  async createRoom(
    @Arg("teamId", () => ID) teamId: string,
    @Arg("name") name: string,
    @Arg("public") p: boolean,
    @Arg("dm", { nullable: true }) dm: boolean,
    @Arg("ann", { nullable: true }) ann: boolean,
    @Ctx() { req }: MyContext
  ): Promise<RoomResponse> {
    const userId = (req.session as any).userId;

    const member = await Member.findOne({ where: { teamId, userId } });

    if (!member?.admin) {
      return {
        ok: false,
        errors: [
          {
            field: "username",
            message: "You can not add rooms to the team",
          },
        ],
      };
    }

    const room = await Room.create({
      name,
      public: p,
      dm,
      ann,
      teamId,
    }).save();

    return {
      ok: true,
      room,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteRoom(@Arg("roomId", () => Int) roomId: number): Promise<Boolean> {
    await Room.delete({ id: roomId });

    return true;
  }

  @Mutation(() => Room)
  @UseMiddleware(isAuth)
  async updateRoom(
    @Arg("roomId", () => Int) roomId: number,
    @Arg("name") name: string
  ): Promise<Room | undefined> {
    const room = await getConnection()
      .createQueryBuilder()
      .update(Room)
      .set({ name })
      .where("id=:id", { id: roomId })
      .returning("*")
      .execute();

    return room.raw[0];
  }
}
