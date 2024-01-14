import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export async function getStreams() {
  let userId: string | null;
  let streams = [];

  try {
    const user = await currentUser();
    userId = user.id;
  } catch (e) {
    userId = null;
  }

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blockings: {
              some: {
                blockingId: userId,
              },
            },
          },
        },
      },
      include: {
        user: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      include: {
        user: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
}
