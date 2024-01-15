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
          AND: [
            {
              NOT: {
                id: userId,
              },
            },
            {
              NOT: {
                blockers: {
                  some: {
                    blockingId: userId,
                  },
                },
              },
            },
          ],
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

export async function getStreamsByTerms(term: string) {
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
        OR: [
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
          { name: { contains: term } },
        ],
        user: {
          AND: [
            {
              NOT: {
                id: userId,
              },
            },
            {
              NOT: {
                blockers: {
                  some: {
                    blockingId: userId,
                  },
                },
              },
            },
          ],
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
      where: {
        OR: [
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
          { name: { contains: term } },
        ],
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
  }

  return streams;
}
