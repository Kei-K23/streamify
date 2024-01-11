import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

export async function getAllFollowingUsers() {
  try {
    const user = await currentUser();

    return await db.follow.findMany({
      where: {
        followerId: user?.id,
      },
      include: {
        following: true,
      },
    });
  } catch (e) {
    return [];
  }
}

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
      throw new Error("Cannot find the user to follow");
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

// create following
export async function followUser(id: string) {
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
      throw new Error("Cannot follow yourself!");
    }

    const existingFollowing = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: user?.id!,
          followingId: otherUser.id,
        },
      },
    });

    if (existingFollowing) {
      throw new Error("Already following the user!");
    }

    const newFollowing = await db.follow.create({
      data: {
        followerId: user?.id!,
        followingId: otherUser.id,
      },
      include: {
        follower: true,
        following: true,
      },
    });

    return newFollowing;
  } catch (e: any) {
    console.log(e);

    throw new Error("Something went wrong when following user");
  }
}

// un-follow to existing user
export async function unFollowUser(id: string) {
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
      throw new Error("Could not find user to unfollow");
    }

    if (otherUser.id === user?.id) {
      throw new Error("Cannot unfollow yourself!");
    }

    const existingFollowing = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: user?.id!,
          followingId: otherUser.id,
        },
      },
    });

    if (!existingFollowing) {
      throw new Error("Cannot unfollow! Not follow yet to this user!");
    }

    const unFollowing = await db.follow.delete({
      where: {
        id: existingFollowing.id,
      },
      include: {
        following: true,
      },
    });

    return unFollowing;
  } catch (e: any) {
    throw new Error("Something went wrong when unfollowing user");
  }
}
