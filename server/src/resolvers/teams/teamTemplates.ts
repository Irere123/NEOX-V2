import { getConnection } from "typeorm";

import { Member } from "../../entity/Member";
import { Room } from "../../entity/Room";
import { Team } from "../../entity/Team";

export const studyGroupTemplate = async (
  name: string,
  userId: any
): Promise<Team | undefined> => {
  let team;

  try {
    await getConnection().transaction(async () => {
      team = await Team.create({ name, userId }).save();
      await Member.create({ admin: true, userId, teamId: team.id }).save();
      await Room.create({
        dm: false,
        public: true,
        teamId: team.id,
        name: "welcome-and-rules",
      }).save();

      await Room.create({
        dm: false,
        public: true,
        teamId: team.id,
        name: "announcements",
      }).save();

      await Room.create({
        dm: false,
        teamId: team.id,
        name: "assignments",
      }).save();

      await Room.create({
        dm: false,
        teamId: team.id,
        name: "rounge",
      }).save();

      await Room.create({
        dm: false,
        public: true,
        teamId: team.id,
        name: "jokes",
      }).save();

      await Room.create({
        dm: false,
        teamId: team.id,
        name: "memes",
      }).save();
    });
  } catch (error) {
    console.log(error);
  }

  return team;
};

export const friendsTemplate = async (
  name: string,
  userId: any
): Promise<Team | undefined> => {
  let team;

  try {
    await getConnection().transaction(async () => {
      team = await Team.create({ name, userId }).save();
      await Member.create({ admin: true, userId, teamId: team.id }).save();

      await Room.create({
        dm: false,
        public: true,
        teamId: team.id,
        name: "announcements",
      }).save();

      await Room.create({
        dm: false,
        teamId: team.id,
        name: "meet-up",
      }).save();

      await Room.create({
        dm: false,
        teamId: team.id,
        name: "movies",
      }).save();

      await Room.create({
        dm: false,
        teamId: team.id,
        name: "songs",
      }).save();

      await Room.create({
        dm: false,
        public: true,
        teamId: team.id,
        name: "jokes",
      }).save();

      await Room.create({
        dm: false,
        teamId: team.id,
        name: "memes",
      }).save();
    });
  } catch (error) {
    console.log(error);
  }

  return team;
};

export const schoolClubTemplate = async (
  name: string,
  userId: any
): Promise<Team | undefined> => {
  let team;

  try {
    await getConnection().transaction(async () => {
      team = await Team.create({ name, userId }).save();
      await Member.create({ admin: true, userId, teamId: team.id }).save();

      await Room.create({
        dm: false,
        public: true,
        teamId: team.id,
        name: "welcome-and-rules",
      }).save();

      await Room.create({
        dm: false,
        public: true,
        teamId: team.id,
        name: "announcements",
      }).save();

      await Room.create({
        dm: false,
        teamId: team.id,
        name: "meet-up",
      }).save();

      await Room.create({
        dm: false,
        teamId: team.id,
        name: "collaboration",
      }).save();

      await Room.create({
        dm: false,
        teamId: team.id,
        name: "resources",
      }).save();

      await Room.create({
        dm: false,
        teamId: team.id,
        name: "general",
      }).save();
    });
  } catch (error) {
    console.log(error);
  }

  return team;
};
