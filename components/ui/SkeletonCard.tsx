import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "./card";
import { Skeleton } from "./skeleton";
export default async function SkeletonCard() {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center">
                <Skeleton className="rounded-full h-12 w-12" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-[250px]" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-4 w-[200px]" />
            </CardFooter>
        </Card>
    );
}
