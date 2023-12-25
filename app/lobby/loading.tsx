import SkeletonCard from "@/components/ui/SkeletonCard";
import prisma from "@/lib/db";

export default async function Loading() {
    const challenges = await prisma.challenge.count();

    return (
        <main>
            <h1 className="mb-5">Coding Challenges</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {"a"
                    .repeat(challenges)
                    .split("")
                    .map((i) => (
                        <SkeletonCard key={i} />
                    ))}
            </div>
        </main>
    );
}
