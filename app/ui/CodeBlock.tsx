"use client";

import { useRef, useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { HandshakeData, UpdatedTextData } from "../lib/defenitions";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/tokyo-night-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
import { editor as MonacoEditor } from "monaco-editor";
import { Editor } from "@monaco-editor/react";
hljs.registerLanguage("javascript", javascript);

export default function CodeBlock({ starterCode }: { starterCode: string }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [role, setRole] = useState("");
  const [text, setText] = useState(starterCode);
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);

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
    console.log("updating only on tutor!");
    //no need to update state on student since he is the one writing in real time,
    //only the tutor state should change so he can see the changes in the text.
    if (role == "tutor") setText(data.updatedText);
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
      // TODO
      socket.disconnect();
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
  function handleTextChange() {
    socket.emit("text change", editorRef.current?.getValue());
  }

  return (
    <div className="bg-blue-600">
      <h1>{isConnected ? `welcome ${role}` : "Waiting..."}</h1>
      <Editor
        className="h-64"
        language="javascript"
        theme="vs-dark"
        options={{ readOnly: role === "tutor" }}
        value={text}
        onChange={handleTextChange}
        onMount={(editor, monaco) => {
          editorRef.current = editor;
        }}
      />
    </div>
  );
}
