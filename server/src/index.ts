import "reflect-metadata";
import "dotenv-safe/config";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import express from "express";
import { createConnection } from "typeorm";
import { join } from "path";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import cors from "cors";
import session from "express-session";
import connectRedis from "connect-redis";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";

import { apiBaseUrl, redirectUrl, clientAppUrl, __prod__ } from "./constants";
import { redis } from "./redis";
import { User as UserResolver, Team, Room, Message } from "./resolvers";
import { User } from "./entity/User";
import { createUser } from "./utils/createUser";
import {
  GoogleUserProfile,
  GithubProfile,
  FacebookUserProfile,
} from "./types/UserProfile";

const main = async () => {
  await createConnection({
    type: "postgres",
    host: !__prod__ ? "localhost" : process.env.DB_HOST,
    database: !__prod__ ? "neox-new" : process.env.DB_NAME,
    username: !__prod__ ? "postgres" : process.env.DB_USERNAME,
    password: !__prod__ ? "postgres" : process.env.DB_PASSWORD,
    logging: !__prod__,
    synchronize: true,
    entities: [join(__dirname, "./entity/**/*.*")],
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });

  const app = express();
  const httpServer = createServer(app);

  app.set("trust proxy", 1);

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      origin: clientAppUrl,
      credentials: true,
    })
  );

  // Express Session Set up
  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        path: "/",
        httpOnly: true,
        secure: __prod__,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 4, // 4 years
      },
    })
  );

  app.use(passport.initialize());

  // Github OAuth2
  passport.use(
    new GitHubStrategy(
      {
        clientID: !__prod__
          ? process.env.DEV_GITHUB_CLIENT_ID
          : process.env.GITHUB_CLIENT_ID,
        clientSecret: !__prod__
          ? process.env.DEV_GITHUB_SECRET
          : process.env.GITHUB_SECRET,
        callbackURL: `${apiBaseUrl}/auth/github/callback`,
        scope: "user:email",
      },
      async (_accessToken, _refreshToken, userProfile, cb) => {
        const profile = userProfile as unknown as GithubProfile;
        let user: User | null | undefined = await User.findOne({
          where: { githubId: profile.id },
        });

        if (!user) {
          user = await createUser({
            username: profile.username,
            githubId: profile.id,
            pictureUrl: profile._json.avatar_url,
            bio: profile._json.bio,
            email: profile._json.email,
          });
        }

        cb(null, {
          userId: user?.id,
        });
      }
    )
  );

  app.get("/auth/github", passport.authenticate("github"));

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { session: false }),
    (req, res) => {
      (req.session as any).userId = (req.user as any).userId;
      res.redirect(redirectUrl);
    }
  );

  // Facebook OAuth
  passport.use(
    new FacebookStrategy(
      {
        clientID: !__prod__
          ? process.env.DEV_FACEBOOK_APP_ID
          : process.env.FACEBOOK_APP_ID,
        clientSecret: !__prod__
          ? process.env.DEV_FACEBOOK_APP_SECRET
          : process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${apiBaseUrl}/auth/facebook/callback`,
        profileFields: ["id", "displayName", "email", "picture"],
      },
      async (_accessToken, _refreshToken, userProfile, cb) => {
        const profile = userProfile as unknown as FacebookUserProfile;
        let user: User | null | undefined = await User.findOne({
          where: { facebookId: profile.id },
        });

        if (!user) {
          user = await createUser({
            username: profile._json.name,
            facebookId: profile.id,
            pictureUrl: profile.photos?.map((p) => p.value)[0],
            bio: profile._json.bio,
            email: profile._json.email,
          });
        }

        cb(null, {
          userId: user?.id,
        });
      }
    )
  );

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { session: false }),
    (req, res) => {
      (req.session as any).userId = (req.user as any).userId;
      res.redirect(redirectUrl);
    }
  );

  // Google OAuth2
  passport.use(
    new GoogleStrategy(
      {
        clientID: !__prod__
          ? process.env.DEV_GOOGLE_CLIENT_ID
          : process.env.GOOGLE_CLIENT_ID,
        clientSecret: !__prod__
          ? process.env.DEV_GOOGLE_SECRET
          : process.env.GOOGLE_SECRET,
        callbackURL: `${apiBaseUrl}/auth/google/callback`,
      },
      async (_accessToken, _refreshToken, userProfile, cb) => {
        const profile = userProfile as unknown as GoogleUserProfile;
        let user: User | null | undefined = await User.findOne({
          where: { googleId: profile.id },
        });

        if (!user) {
          user = await createUser({
            username: profile._json.name,
            googleId: profile.id,
            pictureUrl: profile._json.picture,
            email: profile._json.email,
          });
        }

        cb(null, {
          userId: user?.id,
        });
      }
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
      (req.session as any).userId = (req.user as any).userId;
      res.redirect(redirectUrl);
    }
  );

  const schema = await buildSchema({
    resolvers: [UserResolver, Team, Room, Message],
    validate: false,
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "/graphql" }
  );

  // Server Set up
  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      __prod__
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    context: ({ req, res }: any) => ({ req, res }),
    introspection: true,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server started on ${apiBaseUrl}${apolloServer.graphqlPath}`);
  });
};

main();
