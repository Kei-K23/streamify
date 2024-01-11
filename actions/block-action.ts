"use server";

import { blockUser, unBlockUser } from "@/services/block-service";
import { followUser, unFollowUser } from "@/services/follow-service";
import { revalidatePath } from "next/cache";

export async function onBlock(id: string) {
  try {
    const blockedUser = await blockUser(id);

    revalidatePath("/");

    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocking.username}`);
    }
    return blockedUser;
  } catch (e: any) {
    throw new Error("Internal server error", e);
  }
}

export async function onUnFollow(id: string) {
  try {
    const unBlockedUser = await unBlockUser(id);

    revalidatePath("/");

    if (unBlockedUser) {
      revalidatePath(`/${unBlockedUser.blocking.username}`);
    }
    return unBlockedUser;
  } catch (e: any) {
    throw new Error("Internal server error", e);
  }
}
