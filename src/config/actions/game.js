const domain = "game";
export default domain;

export const GAME = {
  START: `${domain}:start`,
  STARTED: `${domain}:started`,
  SEND_BOARD: `${domain}:send_board`,
  GET_BOARD: `${domain}:get_board`,
  SEND_SCORE: `${domain}:send_score`,
  GET_SCORE: `${domain}:get_score`,
  SEND_PENALTY: `${domain}:send_penalty`,
  GET_PENALTY: `${domain}:get_penalty`,
  SEND_LOSE: `${domain}:send_lose`,
  GET_LOSE: `${domain}:get_lose`,
  WINNER: `${domain}:winner`,
  RESPONSE: `${domain}:response`,
  LEAVER: `${domain}:leaver`,
};
