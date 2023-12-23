import Link from "next/link";

export default function Blocks() {
    return (
        <div className="flex">
            <div className="border border-black ">
                <Link href="/blocks/block1">block1</Link>
            </div>
        </div>
    );
}
