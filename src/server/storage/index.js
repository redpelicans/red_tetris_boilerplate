import { logerror, loginfo } from "utils/log";
import redis from "redis";

export let redisClient;

const runRedis = () =>
  new Promise((resolve, reject) => {
    const host = process.env.REDIS_HOST || "127.0.0.1";
    const port = process.env.REDIS_PORT || 6379;
    redisClient = redis.createClient({ host: host, port: port });
    redisClient.on("connect", function () {
      loginfo("Redis client listening on port:", port);
      resolve();
    });
  });

export const setRedis = (redis) => {
  redisClient = redis;
};

export const quitRedis = () => {
  // should we need to wait for callback?
  redisClient.quit();
  // redisClient.end();
};

export const deleteKeyFromRedis = async (key) => {
  redisClient.del(key);
};

// export const getValueFromRedis = (message) => {
//   return new Promise((resolve, reject) => {
//     redisClient.get(message, (err, data) => {
//       if (err) reject(err);
//       /* Need to choose if we resolve data or object
//       else resolve({ message, data }); */ else
//         resolve(data);
//     });
//   });
// };

// export const getObjectFromRedis = (message) => {
//   return new Promise((resolve, reject) => {
//     redisClient.hgetall(message, (err, data) => {
//       if (err) reject(err);
//       /* Need to choose if we resolve data or object
//       else resolve({ message, data }); */ else
//         resolve(data);
//     });
//   });
// };

export const getComplexObjectFromRedis = (message) => {
  return new Promise((resolve, reject) => {
    redisClient.get(message, (err, data) => {
      if (err) reject(err);
      /* Need to choose if we resolve data or object
      else resolve({ message, data }); */ else
        resolve(JSON.parse(data));
    });
  });
};

// export const setValueToRedis = (message, data) => {
//   return new Promise((resolve, reject) => {
//     redisClient.set(message, data, () => {
//       resolve(message);
//     });
//   });
// };

// export const setObjectoToRedis = (message, data) => {
//   return new Promise((resolve, reject) => {
//     redisClient.hmset(message, data, () => {
//       resolve(message);
//     });
//   });
// };

export const setComplexObjectToRedis = (message, data) => {
  return new Promise((resolve, reject) => {
    const serializedData = JSON.stringify(data);
    redisClient.set(message, serializedData, () => {
      resolve(message);
    });
  });
};

/* const clientExpire = (message) => {
    return new Promise((resolve, reject) => {
      redisClient.expire(message, 10);
      resolve();
    });
  }; */

export default runRedis;
