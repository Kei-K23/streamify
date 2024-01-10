import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

// check if user is following
export async function isFollowingUser(id: string) {
  try {
    let user: User | null;
    try {
      user = await currentUser();
    } catch (e) {
      user = null;
    }

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      throw new Error("Could not find user to follow");
    }

    if (otherUser.id === user?.id) {
      return true;
    }

    const existingFollowing = await db.follow.findFirst({
      where: {
        followerId: user?.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollowing;
  } catch (e: any) {
    return false;
  }
}
