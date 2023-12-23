import { io } from "socket.io-client";

export const socket = io(
    `http://${process.env.NEXT_PUBLIC_NODE_SERVER_IP}:${process.env.NEXT_PUBLIC_NODE_SERVER_PORT}/`,
    {
        transports: ["websocket"],
        autoConnect: false,
    },
);
