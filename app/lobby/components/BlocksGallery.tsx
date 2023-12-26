import Link from "next/link";
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
import { ServerStatus } from "@/lib/defenitions";
import { Challenge } from "@prisma/client";
import clsx from "clsx";

export default async function BlocksGallery({
    serverStatus,
    challenges,
}: {
    serverStatus: ServerStatus;
    challenges: Array<Challenge>;
}) {
    let isTutorOnline = false;
    let chosenChallengeId = 0;
    if (serverStatus.challenge_id && serverStatus.challenge_id) {
        isTutorOnline = true;
        chosenChallengeId = serverStatus.challenge_id;
    }

    return (
        <main>
            {isTutorOnline && (
                <p className="mb-3">
                    tutor is waiting in the highlighted challenge! Good Luck!
                </p>
            )}

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {challenges.map((c, idx) => (
                    <Card
                        key={c.id}
                        className={clsx("flex flex-col justify-between", {
                            "border-primary border-2 bg-secondary": c.id == chosenChallengeId,
                        })}
                    >
                        <CardHeader className="flex flex-row items-center">
                            <Avatar className="mr-3">
                                <AvatarImage src={"/yaron.jpg"} />
                                <AvatarFallback>YH</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{c.title}</CardTitle>
                                <CardDescription className="mt-0">
                                    {c.difficulty}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>{c.description}</CardContent>
                        <CardFooter className="flex justify-between">
                            <Badge variant="outline">{c.badge}</Badge>
                            <Link href={`/challenges/${c.id}`} className="text-xl font-bold">
                                {isTutorOnline && c.id == chosenChallengeId && (
                                    <Button>Start Coding</Button>
                                )}
                                {!isTutorOnline && <Button>Start Coding</Button>}
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    );
}
