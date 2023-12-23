"use client";

import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { HandshakeData } from "../lib/defenitions";
import clsx from "clsx";

export default function CodeBlock() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [role, setRole] = useState("");

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

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("handshake", onHandshake);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    console.log("role ", role);
    return (
        <div>
            <h1>{isConnected ? `welcome ${role}` : "Waiting..."}</h1>
            <form id="form" action="">
                <input
                    id="input"
                    className={clsx("rounded-xl border-black border-2 mr-3 text-sm p-2", {
                        "bg-red-700": role === "student",
                        "bg-blue-700": role === "tutor",
                    })}
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
