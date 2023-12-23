import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center mt-5">
      <ul id="messages"></ul>
      <Link href="/blocks">blocks</Link>
    </div>
  );
}
