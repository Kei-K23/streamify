"use server";

import { v4 } from "uuid";
import { currentUser } from "@/lib/current-user";
import { getUserById } from "@/services/user-service";
import { isBlockUser } from "@/services/block-service";
import { AccessToken } from "livekit-server-sdk";

export async function createViewerToken(hostIdentity: string) {
  try {
    let user;

    try {
      user = await currentUser();
    } catch (e) {
      const id = v4();
      const username = `guest#${Math.floor(Math.random() * 1000)}`;
      user = { id, username };
    }

    const host = await getUserById(hostIdentity);

    if (!host) {
      throw new Error("Could not found host user!");
    }

    const isBlocked = await isBlockUser(host.id);

    if (isBlocked) {
      throw new Error("User is blocked!");
    }

    const isHost = user.id === host.id;

    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY!,
      process.env.LIVEKIT_SECRET_KEY!,
      {
        identity: isHost ? `host-${user.id}` : user.id,
        name: user.username,
      }
    );

    token.addGrant({
      room: host.id,
      roomJoin: true,
      canPublish: false,
      canPublishData: true,
    });

    return await Promise.resolve(token.toJwt());
  } catch (e: any) {
    throw new Error("Something went wrong!");
  }
}
