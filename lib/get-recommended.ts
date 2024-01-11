import { User } from "@prisma/client";
import { currentUser } from "./current-user";
import { db } from "./db";

export async function getRecommended() {
  let users: User[];
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
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
}
