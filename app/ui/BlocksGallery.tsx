import Link from "next/link";
import prisma from "@/lib/db";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function BlocksGallery() {
   const challenges = await prisma.challenge.findMany();

    return (
        <main>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {challenges.map((c, idx) => (
                    <Card key={c.id} className="flex flex-col justify-between">
                        <CardHeader className="flex flex-row items-center">
                            <Avatar className="mr-3">
                                <AvatarImage src={"/yaron.jpg"} />
                                <AvatarFallback>YH</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{c.title}</CardTitle>
                                <CardDescription className="mt-0">easy</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>{c.description}</CardContent>
                        <CardFooter className="flex justify-between">
                            <Badge variant="outline">{c.badge}</Badge>
                            <Link href={`/lobby/${c.id}`} className="text-xl font-bold">
                                <Button>CODE!</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    );
}
