import prisma from "@/lib/db";
import { SessionData } from "@/lib/defenitions";

export async function POST(req: Request) {
  const { challenge_id, code } = (await req.json()) as SessionData;

  try {
    // update if exits, create if it doesn't
    const session = await prisma.session.upsert({
      where: {
        challenge_id: challenge_id,
      },
      update: {
        code: code,
      },
      create: {
        challenge_id: challenge_id,
        code: code,
      },
    });
    return Response.json({ msg: "db updated", status: 200 });
  } catch (e) {
    return Response.json({ error: e });
  }
}
