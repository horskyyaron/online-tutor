"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { HandshakeData, UpdatedTextData } from "../lib/defenitions";
import clsx from "clsx";

export default function CodeBlock() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [role, setRole] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        socket.connect();
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
            console.log(data)
            setText(data.updatedText);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("handshake", onHandshake);
        socket.on("text change", onTextChange);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        setText(e.target.value);
        socket.emit("text change", e.target.value);
    }

    return (
        <div>
            <h1>{isConnected ? `welcome ${role}` : "Waiting..."}</h1>
            <form id="form" action="">
                <input
                    id="input"
                    disabled={role === "tutor"}
                    onChange={handleTextChange}
                    className={clsx("rounded-xl border-black border-2 mr-3 text-sm p-2", {
                        "bg-slate-50 border-slate-200": role === "tutor",
                    })}
                    value={text}
                />
            </form>
            <button
                onClick={() => {
                    alert(`the state of isConnected is: ${role}`);
                }}
            >
                click me!
            </button>
        </div>
    );
}
