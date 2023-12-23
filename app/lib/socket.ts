import { io } from "socket.io-client";

export const socket = io(
  `http://${process.env.NODE_SERVER_IP}:${process.env.NODE_SERVER_PORT}`,
  {
    transports: ["websocket"],
    autoConnect: false,
  },
);
