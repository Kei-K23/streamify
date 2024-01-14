import { db } from "@/lib/db";

export async function getUserByUsername(username: string) {
  return db.user.findUnique({
    where: {
      username,
    },
    include: {
      followers: true,
      stream: true,
    },
  });
}

export async function getUserById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
    include: {
      stream: true,
    },
  });
}
