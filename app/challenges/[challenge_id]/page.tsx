import prisma from "@/lib/db";
import CodeBlock from "./components/CodeBlock";

export default async function ChallengePage({
  params,
}: {
  params: { challenge_id: string };
}) {
  const challenge = await prisma.challenge.findUnique({
    where: {
      id: Number(params.challenge_id),
    },
  });

  const session = await prisma.session.findUnique({
    where: {
      challenge_id: Number(params.challenge_id),
    },
  });


  return (
    <main>
      <h1>{challenge?.title}</h1>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-2">
        The task:
      </h3>
      <p>{challenge?.description}</p>
      <CodeBlock
        lastSessionCode={session ? session.code : challenge?.starterCode || ""}
        challenge_id={challenge?.id.toString() || ""}
        originalCode={challenge?.starterCode || ""}
      />
      ;
    </main>
  );
}
