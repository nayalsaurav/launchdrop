import IORedis from "ioredis";

export const createRedisClient = (url: string) => {
  return new IORedis(url, {
    maxRetriesPerRequest: null,
  });
};
