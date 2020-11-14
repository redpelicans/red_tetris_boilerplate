const domain = "lobby";
export default domain;

export const LOBBY = {
  SUBSCRIBE: `${domain}:subscribe`,
  UNSUBSCRIBE: `${domain}:unsubscribe`,
  UPDATE: `${domain}:update`,
  PUBLISH: `${domain}:publish`,
  RESPONSE: `${domain}:response`,
  READY: `${domain}:ready`,
  KICK: `${domain}:kick`,
  KICKED: `${domain}:kicked`,
  START: `${domain}:start`,
  STARTED: `${domain}:started`,
};
