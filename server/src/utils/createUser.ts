import { User } from "../entity/User";

interface Info {
  username?: string;
  email?: string;
  githubId?: string;
  googleId?: string;
  facebookId?: string;
  bio?: string;
  pictureUrl?: string;
}

export const createUser = async ({
  email,
  username,
  bio,
  githubId,
  googleId,
  facebookId,
  pictureUrl,
}: Info) => {
  let user: User | null | undefined = null;
  let times = 0;

  while (times < 100) {
    try {
      user = await User.create({
        username: times ? `${username}${times}` : username,
        email,
        bio,
        pictureUrl,
        githubId,
        googleId,
        facebookId,
      }).save();
      break;
    } catch (err) {
      if (!err.detail.includes("already exists.")) {
        throw err;
      }
    }

    times += 1;
  }

  return user;
};
