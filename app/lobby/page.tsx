import axios from "axios";
import BlocksGallery from "./components/BlocksGallery";
import prisma from "@/lib/db";

export default async function Lobby() {
    const protocol = process.env.NODE_ENV == "development" ? "http" : "https";
    const ip =
        process.env.NODE_ENV == "development"
            ? "localhost"
            : process.env.NEXT_PUBLIC_NODE_SERVER_IP;
    const port =
        process.env.NODE_ENV == "development"
            ? "4000"
            : process.env.NEXT_PUBLIC_NODE_SERVER_PORT;

    console.log(protocol, ip, port);

    const serverStatus = await axios
        .get(`${protocol}://${ip}:${port}/status`)
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
