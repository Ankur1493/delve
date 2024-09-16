import { db } from "@/lib/db";

interface ConnectSupabaseProps {
  userId: string,
  accessToken: string,
}

export const connectSupabase = async ({ userId, accessToken }: ConnectSupabaseProps) => {
  try {
    const connected = await db.user.update({
      where: { id: userId },
      data: { accessToken }
    })
    if (!connected) {
      return {
        status: "false",
        message: "not connected"
      }
    }
    return {
      status: "true",
      message: "connected"
    }

  } catch (err) {
    console.log(err);
    return {
      status: "false",
      message: "not connected"
    }
  }
}
