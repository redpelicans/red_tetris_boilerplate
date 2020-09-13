export const INIT_SOCKET = "INIT_SOCKET";

export const initSocket = (socket) => ({
  type: INIT_SOCKET,
  socket: socket,
});
