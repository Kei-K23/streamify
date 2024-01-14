"use server";

import { currentUser } from "@/lib/current-user";
import { blockUser, unBlockUser } from "@/services/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomServiceClient = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);

export async function onBlock(id: string) {
  try {
    const user = await currentUser();
    let blockedUser;
    try {
      // follow user
      blockedUser = await blockUser(id);
    } catch (e) {
      // user is guest
    }

    try {
      await roomServiceClient.removeParticipant(user.id, id);
    } catch (e) {
      // user is not in the room
    }

    revalidatePath("/");

    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocking.username}`);
    }
    return blockedUser;
  } catch (e: any) {
    throw new Error("Internal server error", e);
  }
}

export async function onUnBlock(id: string) {
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
