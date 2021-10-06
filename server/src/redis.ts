import Redis from "ioredis";

import { __prod__ } from "./constants";

export const redis = !__prod__ ? new Redis() : new Redis(process.env.REDIS_URL);
