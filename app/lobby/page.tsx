import axios from "axios";
import BlocksGallery from "./components/BlocksGallery";
import prisma from "@/lib/db";

export default async function Lobby() {
  const serverStatus = await axios
    .get("http://localhost:4000/status")
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
