"use client";

import { useRef, useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { HandshakeData, UpdatedTextData } from "../lib/defenitions";
import { editor as MonacoEditor } from "monaco-editor";
import { Editor } from "@monaco-editor/react";

export default function CodeBlock({ starterCode }: { starterCode: string }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [role, setRole] = useState("");
  const [text, setText] = useState(starterCode);
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);

  function onConnect() {
    console.log("connected!");
    setIsConnected(true);
  }

  function onHandshake(data: HandshakeData) {
    console.log("on handshake", data.role);
    setRole(data.role);
  }

  function onTextChange(data: UpdatedTextData) {
    //no need to update state on student since he is the one writing in real time,
    //only the tutor state should change so he can see the changes in the text.
    if (editorRef.current?.getValue() == data.updatedText) {
      console.log("text are equiv");
    } else {
      setText(data.updatedText);
    }
  }

  // setting all the sockets events
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on("connect", onConnect);
    socket.on("handshake", onHandshake);
    socket.on("text change", onTextChange);

    // on unmount, close the socket.
    return () => {
      // TODO
      socket.disconnect();
    };
  }, []);

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
        //getting the editor so we can extract its value and emit it to the tutor.
        onMount={(editor, monaco) => {
          editorRef.current = editor;
        }}
      />
    </div>
  );
}
