"use client";

import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

export default function CodeBlock() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      console.log("connected!");

      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnected!");
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  console.log("isconnected:", isConnected);
  return (
    <form id="form" action="">
      <input
        id="input"
        className="rounded-xl border-black border-2 mr-3 text-sm p-2"
      />
    </form>
  );
}
