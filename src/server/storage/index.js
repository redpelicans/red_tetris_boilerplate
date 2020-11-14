import { loginfo } from "utils/log";
import redis from "redis";

export let redisClient;

const runRedis = () =>
  new Promise((resolve) => {
    const host = process.env.REDIS_HOST || "127.0.0.1";
    const port = process.env.REDIS_PORT || 6379;
    redisClient = redis.createClient({ host, port });
    redisClient.on("connect", () => {
      loginfo("Redis client listening on port:", port);
      resolve();
    });
  });

export const setRedis = (redis) => {
  redisClient = redis;
};

export const quitRedis = () => {
  redisClient.quit();
};

export const deleteKeyFromRedis = async (key) => {
  redisClient.del(key);
};

export const getComplexObjectFromRedis = (message) =>
  new Promise((resolve, reject) => {
    redisClient.get(message, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });

export const setComplexObjectToRedis = (message, data) =>
  new Promise((resolve) => {
    const serializedData = JSON.stringify(data);
    redisClient.set(message, serializedData, () => {
      resolve(message);
    });
  });

export default runRedis;
