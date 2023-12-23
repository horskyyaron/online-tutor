"use client";
import CodeBlock from "./ui/CodeBlock";

export default function Home() {
    return (
        <div className="flex items-center justify-center mt-5">
            <ul id="messages"></ul>
            <CodeBlock />
        </div>
    );
}
