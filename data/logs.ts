import { db } from "@/lib/db";
import { LogType } from "@prisma/client"

interface CreateLogArgs {
  userId: string;
  message: string;
  type: LogType;
  status?: boolean;
}

export const createLog = async ({ userId, message, type, status }: CreateLogArgs) => {
  try {
    const logCreated = await db.logs.create({
      data: {
        userId,
        message,
        type,
        status
      }
    })
    if (!logCreated) {
      return false
    }
    return true
  } catch (err) {
    console.log(err);
    return false
  }
}

export const getAllLogs = async () => {
  try {

    const logs = await db.logs.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    if (!logs) {
      return {
        status: false,
        message: "failed to get logs",
        data: []
      }
    }
    return {
      status: true,
      message: "here are all the logs",
      data: logs
    }

  } catch (err) {
    return {
      status: false,
      message: "failed to get logs",
      data: []
    }
  }
}
