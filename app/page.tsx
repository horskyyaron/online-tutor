"use client";
import CodeBlock from "./ui/CodeBlock";

export default function Home() {
  console.log(
    `http://${process.env.NODE_SERVER_IP}:${process.env.NODE_SERVER_PORT}`,
  );

  return (
    <div className="flex items-center justify-center mt-5">
      <ul id="messages"></ul>
      <CodeBlock />
    </div>
  );
}
