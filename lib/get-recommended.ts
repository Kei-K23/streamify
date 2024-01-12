import { Stream, User } from "@prisma/client";
import { currentUser } from "./current-user";
import { db } from "./db";

export async function getRecommended() {
  let users;
  let user: User | null;

  try {
    user = await currentUser();
  } catch (e) {
    user = null;
  }

  if (user) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: user.id,
            },
          },
          {
            NOT: {
              followings: {
                some: {
                  followerId: user.id,
                },
              },
            },
          },
          {
            NOT: {
              blockings: {
                some: {
                  blockingId: user.id,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
}
