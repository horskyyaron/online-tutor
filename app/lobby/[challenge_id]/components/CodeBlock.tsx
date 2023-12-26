"use client";

import { useRef, useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { HandshakeData, UpdatedTextData } from "@/lib/defenitions";
import { editor as MonacoEditor } from "monaco-editor";
import { Editor } from "@monaco-editor/react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/tokyo-night-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
import { saveSession } from "@/lib/queries";
hljs.registerLanguage("javascript", javascript);

export default function CodeBlock({
  starterCode,
  challenge_id,
}: {
  starterCode: string;
  challenge_id: string;
}) {
  //socket related states
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [role, setRole] = useState("");
  const [text, setText] = useState(starterCode);

  // editor ref
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);

  // debounce effect related states
  const [initialText, setInitialText] = useState(starterCode);
  const [debouncing, setDebouncing] = useState(false);

  // debounce effect
  useEffect(() => {
    // save initial text value
    if (!debouncing) {
      setInitialText(text);
    }

    setDebouncing(true);

    //after the delay, check if the initial text(which we saved in the initialText state)
    //is different than the current text, if so, update db.
    const timerId = setTimeout(async () => {
      if (text !== initialText) {
        console.log("updating db");
        const res = await saveSession({
          challenge_id: Number(challenge_id),
          code: text,
        });
        console.log(res);
      }
      setDebouncing(false);
    }, 3000);

    // if text changed, clean up useEffect by removing the timeout and cancelling the db update.
    // and starting the process again.
    return () => clearTimeout(timerId);
  }, [text]);

  function onConnect() {
    console.log("connected!");
    setIsConnected(true);
  }

  function onHandshake(data: HandshakeData) {
    console.log("on handshake", data.role);
    setRole(data.role);
    // updating server which challenge is active
    socket.emit("challenge", challenge_id);
  }

  function onFull(data: HandshakeData) {
    console.log("room is full", data.role);
  }

  function onTextChange(data: UpdatedTextData) {
    //no need to update state on student since he is the one writing in real time,
    //only the tutor state should change so he can see the changes in the text.
    setText(data.updatedText);
  }

  // emit server that text has changed so it can brodcast it to the other clients (the tutor will be 'updated')
  function handleTextChange() {
    socket.emit("text change", editorRef.current?.getValue());
  }

  // setting up all the sockets events
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on("connect", onConnect);
    socket.on("handshake", onHandshake);
    socket.on("text change", onTextChange);
    socket.on("full", onFull);

    // on unmount, close the socket.
    return () => {
      socket.disconnect();
    };
  }, []);

  // highlights tutor code block
  useEffect(() => {
    const code = document.getElementById("codeblock");
    if (code) {
      // Unset the highlighted dataset to allow re-highlighting
      code.removeAttribute("data-highlighted");
      hljs.highlightElement(code);
    }
  }, [text]);

  if (role === "tutor") {
    return (
      <main>
        <pre>
          <code id="codeblock" className="language-javascript text-left">
            {text}
          </code>
        </pre>
      </main>
    );
  } else {
    return (
      <main>
        <h1>{isConnected ? `welcome ${role}` : "Waiting..."}</h1>
        <Editor
          className="h-64"
          language="javascript"
          theme="vs-dark"
          options={{ readOnly: role === "tutor" }}
          onChange={handleTextChange}
          defaultValue={starterCode}
          //getting the editor so we can extract its value and emit it to the tutor.
          onMount={(editor, monaco) => {
            editorRef.current = editor;
          }}
        />
      </main>
    );
  }
}
