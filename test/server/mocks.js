export const player1mock = {
  name: "player1",
  socketId: "socket1",
};

export const player2mock = {
  name: "player2",
  socketId: "socket2",
};

export const playerInvalid1mock = {
  name: "",
  socketId: "socket1",
};

export const playerInvalid2mock = {
  name: "ab",
  socketId: "socket1",
};

export const playerInvalid3mock = {
  name: "abcdefghijklmnopqrstuvwxyz",
  socketId: "socket1",
};

export const playerInvalid4mock = {
  name: "player1/",
  socketId: "socket1",
};

export const playerObject1mock = {
  id: "id1",
  name: "player1",
  socketId: "socket1",
};

export const playerObject2mock = {
  id: "id2",
  name: "player2",
  socketId: "socket2",
};

export const playerObject3mock = {
  id: "id3",
  name: "player3",
  socketId: "socket3",
};

export const playerObject4mock = {
  id: "id4",
  name: "player4",
  socketId: "socket4",
};

export const lobby1mock = {
  id: "1",
  name: "lobby1",
  maxPlayer: 3,
  isPlaying: false,
  owner: playerObject1mock,
  players: [
    { player: playerObject1mock, ready: false },
    { player: playerObject2mock, ready: false },
  ],
};

export const lobby2mock = {
  id: "2",
  name: "lobby2",
  maxPlayer: 3,
  isPlaying: false,
  owner: playerObject3mock,
  players: [
    { player: playerObject3mock, ready: false },
    { player: playerObject4mock, ready: false },
  ],
};

export const game1mock = {
  id: "1",
  name: "lobby1",
  over: false,
  lobbyId: "1",
  players: [
    { player: playerObject1mock, score: 0, loser: false },
    { player: playerObject2mock, score: 0, loser: false },
  ],
};

export const game2mock = {
  id: "2",
  name: "lobby2",
  over: false,
  lobbyId: "2",
  players: [
    { player: playerObject3mock, score: 0, loser: false },
    { player: playerObject4mock, score: 0, loser: false },
  ],
};
