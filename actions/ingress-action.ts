"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import {
  IngressClient,
  IngressInput,
  RoomServiceClient,
  CreateIngressOptions,
  IngressVideoEncodingPreset,
  IngressAudioEncodingPreset,
} from "livekit-server-sdk";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import { revalidatePath } from "next/cache";

const roomServiceClient = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);

const ingressClient = new IngressClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);

export async function resetIngresses(hostIdentity: string) {
  // get the list of ingress
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });
  // get the list of room
  const rooms = await roomServiceClient.listRooms([hostIdentity]);

  // delete all rooms
  if (ingresses.length) {
    for (const room of rooms) {
      await roomServiceClient.deleteRoom(room.name);
    }
  }

  // delete all ingress
  if (rooms.length) {
    for (const ingress of ingresses) {
      if (ingress.ingressId) {
        await ingressClient.deleteIngress(ingress.ingressId);
      }
    }
  }
}

export async function createIngress(ingressType: IngressInput) {
  const user = await currentUser();

  await resetIngresses(user.id);

  if (!user) {
    throw new Error("Unauthorize user!");
  }

  const ingressOptions: CreateIngressOptions = {
    roomName: user.id,
    name: user.username,
    participantIdentity: user.id,
    participantName: user.username,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    ingressOptions.bypassTranscoding = true;
  } else {
    ingressOptions.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    ingressOptions.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }

  const ingress = await ingressClient.createIngress(
    ingressType,
    ingressOptions
  );

  if (!ingress || !ingress.streamKey || !ingress.url) {
    throw new Error("Something went wrong when creating ingress");
  }

  await db.stream.update({
    where: {
      userId: user.id,
    },
    data: {
      streamKey: ingress.streamKey,
      serverUrl: ingress.url,
      ingressId: ingress.ingressId,
    },
  });

  revalidatePath(`/u/${user.username}/keys`);
  return ingress;
}
