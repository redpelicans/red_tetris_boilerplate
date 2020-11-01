const domain = "lobby";
export default domain;

export const LOBBY = {
  SUBSCRIBE: `${domain}:subscribe`,
  UNSUBSCRIBE: `${domain}:unsubscribe`,
  UPDATE: `${domain}:update`,
  PUBLISH: `${domain}:publish`,
  RESPONSE: `${domain}:response`,
  READY: `${domain}:ready`,
  LEAVER: `${domain}:leaver`,
  START: `${domain}:start`,
  STARTED: `${domain}:started`,
};
