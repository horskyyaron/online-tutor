import { io } from "socket.io-client";

const IP =
  process.env.NODE_ENV == "development"
    ? "localhost"
    : process.env.NEXT_PUBLIC_NODE_SERVER_IP;
const PORT =
  process.env.NODE_ENV == "development"
    ? "4000"
    : process.env.NEXT_PUBLIC_NODE_SERVER_IP;

export const socket = io(`http://${IP}:${PORT}/`, {
  transports: ["websocket"],
  autoConnect: false,
});
