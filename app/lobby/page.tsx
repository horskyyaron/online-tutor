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

  const serverStatus = await axios
    .get(`${PROTOCOL}://${IP}:${PORT}/`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });

  const challenges = await prisma.challenge.findMany();

  return (
    <main>
      <h1 className="mb-5">Coding Challenges</h1>
      <BlocksGallery
        serverStatus={serverStatus.session}
        challenges={challenges}
      />
    </main>
  );
}
