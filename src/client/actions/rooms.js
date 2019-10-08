export const isJoining = (joining, room) => {
  console.log("action isJOining")
  return {
    type: "ROOM",
    state: "IS_JOINING",
    joining,
    room
  }
}



// socket.on event
export const onPlayers = () => {
  return {
    event: "PLAYERS",
    handle: "ROOM",
    state: "PLAYERS"
  }
}
