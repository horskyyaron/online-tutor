import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-center h-16">
                    <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <Link
                                href="/"
                                className="text-xl font-bold px-3 py-2 rounded-md text-white hover:text-gray-300"
                            >
                                Home
                            </Link>
                            <Link
                                href="/lobby"
                                className="text-xl font-bold px-3 py-2 rounded-md text-white hover:text-gray-300"
                            >
                                Lobby
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
