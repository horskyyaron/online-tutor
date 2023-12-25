import { Code, Home, Terminal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import { ModeToggle } from "./toggle-mode";

export default function Navbar() {
  return (
    <div className="bg-secondary flex flex-row justify-center gap-10 p-4 items-center">
      <Link href="/">
        <div className="flex">
          <Home className="mr-2" />
          <span className="hidden md:inline">HOME</span>
        </div>
      </Link>
      <Link href="/lobby">
        <div className="flex">
          <Code className="mr-2" />
          <span className="hidden md:inline">LOBBY</span>
        </div>
      </Link>
      <ModeToggle />
    </div>
  );
}
