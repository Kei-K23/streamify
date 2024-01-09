import { currentUser as ClerkCurrentUser } from "@clerk/nextjs";
import { db } from "./db";

export async function currentUser() {
  try {
    const user = await ClerkCurrentUser();

    if (!user || user.username) {
      throw new Error("Could not find user");
    }

    const dbUser = await db.user.findUnique({
      where: {
        externalUserId: user.id,
      },
    });

    if (!dbUser) {
      throw new Error("Could not find user");
    }

    return dbUser;
  } catch (e: any) {
    throw new Error("Something went wrong", e);
  }
}
