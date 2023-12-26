import axios from "axios";
import BlocksGallery from "./components/BlocksGallery";
import prisma from "@/lib/db";

export default async function Lobby() {
  const IP =
    process.env.NODE_ENV == "development"
      ? "localhost"
      : process.env.NEXT_PUBLIC_NODE_SERVER_IP;
  const PORT = process.env.NODE_ENV == "development" ? "4000" : "";
  const PROTOCOL = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${PROTOCOL}://${IP}:${PORT}/status`);
  const result = await res.json();

  console.log(result);

  const challenges = await prisma.challenge.findMany();

  return (
    <main>
      <h1 className="mb-5">Coding Challenges</h1>
      <BlocksGallery serverStatus={result.session} challenges={challenges} />
    </main>
  );
}
