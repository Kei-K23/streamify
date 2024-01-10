"use server";

import { followUser, unFollowUser } from "@/services/follow-service";
import { revalidatePath } from "next/cache";

export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }
    return followedUser;
  } catch (e: any) {
    console.log(e);

    throw new Error("Internal server error", e);
  }
}

export async function onUnFollow(id: string) {
  try {
    const unFollowedUser = await unFollowUser(id);

    revalidatePath("/");

    if (unFollowedUser) {
      revalidatePath(`/${unFollowedUser.following.username}`);
    }
    return unFollowedUser;
  } catch (e: any) {
    console.log(e);

    throw new Error("Internal server error", e);
  }
}
