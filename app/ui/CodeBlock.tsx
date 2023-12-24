"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { HandshakeData, UpdatedTextData } from "../lib/defenitions";
import clsx from "clsx";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/tokyo-night-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

export default function CodeBlock({ starterCode }: { starterCode: string }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [role, setRole] = useState("");
  const [text, setText] = useState(starterCode);

  function onConnect() {
    console.log("connected!");
    setIsConnected(true);
  }

  function onDisconnect() {
    console.log("disconnected!");
    setIsConnected(false);
  }

  function onHandshake(data: HandshakeData) {
    if (role === "") {
      setRole(data.role);
    }
  }

  function onTextChange(data: UpdatedTextData) {
    setText(data.updatedText);
  }

  // setting all the sockets events
  useEffect(() => {
    socket.connect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("handshake", onHandshake);
    socket.on("text change", onTextChange);

    // on unmount, close the socket.
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    const code = document.getElementById("codeblock");
    if (code) {
      // Unset the highlighted dataset to allow re-highlighting
      code.removeAttribute("data-highlighted");
      hljs.highlightElement(code);
    }
  }, [text]);

  // emit server that text has changed so it can brodcast it to the other clients (the tutor will be 'updated')
  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    socket.emit("text change", e.target.value);
  }

  return (
    <div>
      <h1>{isConnected ? `welcome ${role}` : "Waiting..."}</h1>
      <textarea
        id="input"
        disabled={role === "tutor"}
        onChange={handleTextChange}
        className={clsx("rounded-xl border-black border-2 mr-3 text-sm p-2", {
          "bg-slate-50 border-slate-200": role === "tutor",
        })}
        value={text}
      />
      <pre>
        <code id="codeblock" className="language-javascript">
          {text}
        </code>
      </pre>
    </div>
  );
}
