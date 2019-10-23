export const ROOM = "ROOM"

export const onJoined = () => ({
  event: "JOINED",
  handle: ROOM,
  state: "JOINED"
})

export const onDisplay = () => {
    return {
	event: "DISPLAY",
	handle: ROOM,
	state: "DISPLAY",
    }

}

export const onHost = () => {
    return {
	event: "HOST",
	handle: ROOM,
	state: "HOST",
    }
}

export const onPlayers = () => {
    return {
	event: "PLAYERS",
	handle: ROOM,
	state: "PLAYERS",
    }
}

export const emitStart = () => {
  return {
    event: "START",
    emit: true,
    payload: "START"
  }
}


export const emitMove = (move) => {
  return {
    event: "CONTROLLER",
    emit: true,
    payload: move
  }
}


export const startGame = (start) => {
  return {
    type: "ROOM",
    state: "START",
    start
  }
}

export const emitQuit = () => ({
  emit: true,
  event: "QUIT",
  handle: ROOM,
  state: "QUIT"
})

export const onQuit = () => ({
  event: "QUIT",
  handle: ROOM,
  state: "QUIT"
})
