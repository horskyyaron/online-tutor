import Link from "next/link";
import prisma from "../lib/db";

export default async function Lobby() {
  const challenges = await prisma.challenge.findMany();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Choose a Code Block
      </h1>
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {challenges.map((c, idx) => (
          <div
            key={idx}
            className="flex justify-center items-center border border-gray-300 shadow-lg rounded-lg h-40 hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            <Link href={`/lobby/${c.id}`} className="text-xl font-bold">
              {c.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
