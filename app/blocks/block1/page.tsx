import CodeBlock from "@/app/ui/CodeBlock";

export default function Blocks() {
  console.log(process.env.NODE_ENV);

  return (
    <div>
      <CodeBlock />
    </div>
  );
}
