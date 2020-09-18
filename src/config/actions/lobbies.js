const domain = "lobbies";
export default domain;

export const LOBBIES = {
  ADD: `${domain}:add`,
  DELETE: `${domain}:delete`,
  SUBSCRIBE: `${domain}:subscribe`,
  UNSUBSCRIBE: `${domain}:unsubscribe`,
  PUBLISH: `${domain}:publish`,
  RESPONSE: `${domain}:response`,
};
