"use client";
import Link from "next/link";

export default function Blocks() {
  const blocks = [
    "sum_of_numbers",
    "string_reversal",
    "find_largest_number",
    "palindrom",
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Choose a Code Block
      </h1>
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="flex justify-center items-center border border-gray-300 shadow-lg rounded-lg h-40 hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            <Link href={`/blocks/${block}`} className="text-xl font-bold">
              {block}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// return (
//     <div className="flex">
//         <div className="border border-black ">
//             <Link href="/blocks/block1" >block1</Link>
//         </div>
//     </div>
// );
