import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <h1 className="text-6xl font-bold">Welcome to OTH!</h1>
      <h2 className="text-xl pt-2">OTH - online tutoring hub</h2>
      <p>
        we invite to join the lobby for new and exciting challenges made by your
        tutor!
      </p>
      <Link href="/lobby">
        <button
          type="button"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          lobby
        </button>
      </Link>
    </div>
  );
}
