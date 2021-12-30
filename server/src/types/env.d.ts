declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_HOST: string;
    REDIS_URL: string;
    SESSION_SECRET: string;
    DEV_GITHUB_SECRET: string;
    DEV_GITHUB_CLIENT_ID: string;
    DEV_GOOGLE_SECRET: string;
    DEV_GOOGLE_CLIENT_ID: string;
    DEV_FACEBOOK_APP_ID: string;
    DEV_FACEBOOK_APP_SECRET: string;
    GITHUB_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GOOGLE_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    FACEBOOK_APP_ID: string;
    FACEBOOK_APP_SECRET: string;
  }
}
