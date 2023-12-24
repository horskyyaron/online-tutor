import prisma from "@/app/lib/db";
import CodeBlock from "@/app/ui/CodeBlock";

export default async function Blocks({
  params,
}: {
  params: { challenge_id: string };
}) {
  console.log(params.challenge_id);

  const challenge = await prisma.challenge.findFirst({
    where: {
      id: Number(params.challenge_id),
    },
  });

  return (
    <div>
    <h1>{challenge?.title}</h1>
    <h2>{challenge?.description}</h2>
      <CodeBlock />
    </div>
  );
}
