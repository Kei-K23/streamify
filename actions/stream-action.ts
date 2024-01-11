"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateStream(values: Omit<Partial<Stream>, "id">) {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorize user!");
    }

    const stream = await db.stream.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!stream) {
      throw new Error("Cannot find the stream!");
    }

    const validData: Omit<Partial<Stream>, "id"> = {
      name: values.name,
      thumbnailImg: values.thumbnailImg,
      isChatEnable: values.isChatEnable,
      isChatFollowerOnly: values.isChatFollowerOnly,
      isDelayChat: values.isDelayChat,
    };

    const updatedStream = await db.stream.update({
      where: {
        id: stream.id,
      },
      data: {
        ...validData,
      },
    });

    // revalidate the cache

    revalidatePath(`/u/${user.username}`);
    revalidatePath(`/u/${user.username}/setting`);
    revalidatePath(`/${user.username}`);
    revalidatePath(`/`);
    console.log(updatedStream, values);

    return updatedStream;
  } catch (e: any) {
    console.log(e);

    throw new Error("Internal server error!");
  }
}
