"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateUser(values: Partial<User>) {
  try {
    const user = await currentUser();

    const validData: Partial<User> = {
      ...values,
    };

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: { ...validData },
    });

    revalidatePath(`/u/${updatedUser.username}`);
    revalidatePath(`/${updatedUser.username}`);

    return updatedUser;
  } catch (e: any) {
    throw new Error("Internal server error", e);
  }
}
