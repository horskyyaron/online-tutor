"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { HandshakeData, UpdatedTextData } from "../lib/defenitions";
import clsx from "clsx";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/tokyo-night-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

export default function CodeBlock() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [role, setRole] = useState("");
  const [text, setText] = useState("");

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
    console.log(data);
    setText(data.updatedText);
  }

  useEffect(() => {
    socket.connect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("handshake", onHandshake);
    socket.on("text change", onTextChange);

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
        className={clsx(
          "rounded-xl border-black border-2 mr-3 text-sm p-2",
          {
            "bg-slate-50 border-slate-200": role === "tutor",
          },
        )}
        value={text}
      />
      <pre>
        <code
          id="codeblock"
          className="language-javascript"
        >
          {text}
        </code>
      </pre>
    </div>
  );
}
