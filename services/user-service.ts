import { db } from "@/lib/db";

export async function getUserByUsername(username: string) {
  return db.user.findUnique({
    where: {
      username,
    },
  });
}
