export function ping() {
  return {
    event: "ping",
    handle: function (data) {
      console.log("ping aciton: server response:", data)
    }
  }
}


export function testAction(payload) {
  return {
    event: 'action',
    emit: true,
    payload: payload
  }
}


export const emitJoin = (room) => {
  console.log("emitJoin")
  return {
    event: 'JOIN_ROOM',
    emit: true,
    payload: room
  }
}

export const onJoin = () => {
  return {
    event: 'JOIN_ROOM',
    handle: 'ROOM_JOINED'
  }
}

// on Event Listener
export const listRoom = () => {
  return {
    event: 'FETCH_ROOMS',
    handle: "FETCH_ROOMS"
  }
}

// emit Event Listener
export const fetch_rooms = (payload) => {
  return {
    event: 'FETCH_ROOMS',
    emit: true,
    payload: payload
  }
}

