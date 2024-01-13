import { db } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get("Authorization");

  if (!authorization) {
    return new NextResponse(
      JSON.stringify({ success: false, error: "Unauthorized user!" }),
      { status: 403 }
    );
  }

  // event is a WebhookEvent object
  const event = receiver.receive(body, authorization);

  const isStreamExist = await db.stream.findFirst({
    where: {
      ingressId: event.ingressInfo?.ingressId,
    },
  });

  if (isStreamExist) {
    // live is end
    if (event.event === "ingress_ended") {
      await db.stream.update({
        where: {
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: false,
        },
      });
    }

    // live is start
    if (event.event === "ingress_started") {
      await db.stream.update({
        where: {
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: true,
        },
      });
    }

    return new NextResponse("", { status: 200 });
  }
}
