import { logerror, loginfo } from "utils/log";
import redis from "redis";

export let redisClient;

const runRedis = () => {
  redisClient = redis.createClient();
  redisClient.on("connect", function () {
    loginfo("Redis client is now connected");
  });
};

export const getValueFromRedis = (message) => {
  return new Promise((resolve, reject) => {
    redisClient.get(message, (err, data) => {
      if (err) reject(err);
      // else resolve({ message, data });
      else resolve(data);
    });
  });
};

export const getObjectFromRedis = (message) => {
  return new Promise((resolve, reject) => {
    redisClient.hgetall(message, (err, data) => {
      if (err) reject(err);
      // else resolve({ message, data });
      else resolve(data);
    });
  });
};

export const getComplexObjectFromRedis = (message) => {
  return new Promise((resolve, reject) => {
    redisClient.get(message, (err, data) => {
      if (err) reject(err);
      // else resolve({ message, data: JSON.parse(data) });
      else resolve(JSON.parse(data));
    });
  });
};

export const setValueToRedis = (message, data) => {
  return new Promise((resolve, reject) => {
    redisClient.set(message, data, () => {
      resolve(message);
    });
  });
};

export const setObjectoToRedis = (message, data) => {
  return new Promise((resolve, reject) => {
    redisClient.hmset(message, data, () => {
      resolve(message);
    });
  });
};

export const setComplexObjectToRedis = (message, data) => {
  return new Promise((resolve, reject) => {
    const serializedData = JSON.stringify(data);
    redisClient.set(message, serializedData, () => {
      resolve(message);
    });
  });
};

// const clientExpire = (message) => {
//   return new Promise((resolve, reject) => {
//     redisClient.expire(message, 10);
//     resolve();
//   });
// };

export default runRedis;
