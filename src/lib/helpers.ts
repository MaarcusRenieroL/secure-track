import { db } from "@/lib/db";

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        userId: id,
      }
    })

    return user;
  } catch (error) {
    console.log(error);
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email: email
      }
    })

    return user;
  } catch (error) {
    console.log(error);
  }
}
