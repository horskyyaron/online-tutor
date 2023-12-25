import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <h1 className="text-6xl font-bold">Welcome to OTH!</h1>
            <p>
                we invite to join the lobby for new and exciting challenges made by your
                tutor!
            </p>
            <Link href="/lobby">
                <Button>Lobby</Button>
            </Link>
        </main>
    );
}
