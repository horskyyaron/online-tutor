import CodeBlock from "@/app/ui/CodeBlock";

export default function Blocks({ params }: { params: { problem: string } }) {
  return (
    <div>
      <h1>{params.problem}</h1>
      <CodeBlock />
    </div>
  );
}
