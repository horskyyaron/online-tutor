import prisma from "@/app/lib/db";
import CodeBlock from "@/app/ui/CodeBlock";

export default async function ChallengePage({
  params,
}: {
  params: { challenge_id: string };
}) {
  const challenge = await prisma.challenge.findFirst({
    where: {
      id: Number(params.challenge_id),
    },
  });

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">{challenge?.title}</h1>
        <h2 className="text-xl font-semibold">{challenge?.description}</h2>
        <div className="mt-6 text-black">
          <CodeBlock starterCode={challenge?.starterCode || ""} />
        </div>
      </div>
    </div>
  );
}
