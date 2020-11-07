import { logerror, loginfo } from "utils/log";
import Joi from "joi";
import Hoek from "@hapi/hoek";

/**
 * Create an event to be implemented into sockets
 * @param {String} name - The name of the event
 * @param {object} rules - Object containing Joi validation rules
 * @param {Function} fn - The function to be called on event
 * @returns {*} The event Object
 */

export const createEvent = (name, rules, fn) => {
  Hoek.assert(!!name, "socket/helpers - socket.createEvent() must have a name");
  Hoek.assert(
    typeof fn === "function",
    "socket/helpers - socket.createEvent() must have a function",
  );

  return {
    name,
    fn,
    validation: rules && Joi.object().keys(rules),
  };
};

/**
 * Bind an event to a socket
 * @param {String} name - The name of the event
 * @param {any} validation - A Joi object validation
 * @param {Function} fn - The function to be called on event
 */

export const bindEvent = (socket, { name, validation, fn }) => {
  socket.on(name, (payload = {}) => {
    if (validation) {
      /* Careful Joi.validate is deprecated (<14) */
      Joi.validate(payload, validation, (error) => {
        if (error) {
          logerror("bindEvent error!", error.details);
          return socket.emit(name, { error });
        } else {
          return fn(socket, payload);
        }
      });
    } else {
      return fn(socket, payload);
    }
  });
};
