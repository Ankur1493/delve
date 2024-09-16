import { db } from "@/lib/db"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
}

export const checkUserSupabaseConnection = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } })

    if (!user) {
      return {
        token: null,
        status: false,
        message: "user not registered"
      }
    }

    const connected = user.Connected;
    if (!connected) {
      return {
        token: null,
        status: false,
        message: "Not connected yet"
      };
    }

    return {
      token: user.accessToken,
      status: true,
      message: "supabase connected"
    };
  } catch (err) {
    console.log(err);
    return {
      token: null,
      status: false,
      message: "We are facing some issue"
    };
  }
}
