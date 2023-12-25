import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Home() {
  return (
    <main>
      <h1 className="text-6xl font-bold">Welcome to OTH!</h1>
      <p>
        Welcome to OTH - the online tutoring hub.
        <br />
        We invite to explore the lobby for new and exciting challenges made by
        your tutor!
      </p>

      <AspectRatio ratio={16 / 9} className="bg-muted mt-4">
        <Image
          src="/coding3.png"
          alt="coding"
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </main>
  );
}
