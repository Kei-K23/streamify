import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

export async function getAllBlockingUsers() {
  try {
    const user = await currentUser();

    return await db.block.findMany({
      where: {
        blockerId: user?.id,
      },
      include: {
        blocking: true,
      },
    });
  } catch (e) {
    return [];
  }
}

// check if user is blocking
export async function isBlockUser(id: string) {
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
      throw new Error("Cannot find the user to block");
    }

    if (otherUser.id === user?.id) {
      return false;
    }

    const existingBlock = await db.block.findFirst({
      where: {
        blockerId: user?.id,
        blockingId: id,
      },
    });

    return !!existingBlock;
  } catch (e: any) {
    return false;
  }
}

// create blocking the user
export async function blockUser(id: string) {
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
      throw new Error("Could not find user to block");
    }

    if (otherUser.id === user?.id) {
      throw new Error("Cannot block yourself!");
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockingId: {
          blockerId: user?.id!,
          blockingId: id,
        },
      },
    });

    if (existingBlock) {
      throw new Error("Already block the user!");
    }

    const newBlocking = await db.block.create({
      data: {
        blockerId: user?.id!,
        blockingId: id,
      },
      include: {
        blocking: true,
      },
    });

    return newBlocking;
  } catch (e: any) {
    console.log(e);

    throw new Error("Something went wrong when blocking user");
  }
}

// unBlock to existing user
export async function unBlockUser(id: string) {
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
      throw new Error("Could not find user to unblock");
    }

    if (otherUser.id === user?.id) {
      throw new Error("Cannot unblock yourself!");
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockingId: {
          blockerId: user?.id!,
          blockingId: id,
        },
      },
    });

    if (!existingBlock) {
      throw new Error("Cannot unblock! Not block to this user!");
    }

    const unBlocking = await db.block.delete({
      where: {
        id: existingBlock.id,
      },
      include: {
        blocking: true,
      },
    });

    return unBlocking;
  } catch (e: any) {
    throw new Error("Something went wrong when unblocking user");
  }
}
