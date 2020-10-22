export const player1mock = {
  name: "player1",
  socketId: "1",
};

export const player2mock = {
  name: "player2",
  socketId: "2",
};

export const playerInvalid1mock = {
  name: "",
  socketId: "1",
};

export const playerInvalid2mock = {
  name: "ab",
  socketId: "1",
};

export const playerInvalid3mock = {
  name: "abcdefghijklmnopqrstuvwxyz",
  socketId: "1",
};

export const playerInvalid4mock = {
  name: "player1/",
  socketId: "1",
};

export const lobbyMock = {
  id: "1",
  name: "lobby1",
  owner: {},
  players: [{}],
};
