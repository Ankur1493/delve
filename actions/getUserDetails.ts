"use server"
import axios from "axios"
import { db } from "@/lib/db";

export const getUserProjects = async (userId: string) => {
  try {
    const user = await db.user.findUnique({ where: { id: userId } })

    const accessToken = user?.accessToken
    if (!accessToken) {
      return {
        status: "false",
        message: "no access token found",
        data: []
      }
    }

    const userProjects = await axios('https://api.supabase.com/v1/projects', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!userProjects) {
      return {
        status: "false",
        message: "User has no projects in supabase",
        data: []
      }
    }

    return {
      status: "true",
      message: "projects found",
      data: userProjects.data
    }
  } catch (err) {
    return {
      status: "false",
      message: "Internal error occured",
      data: []
    }
  }
}

export const getOrgMembers = async ({ userId, orgId }: { userId: string, orgId: string }) => {

  try {
    const user = await db.user.findUnique({ where: { id: userId } })

    const accessToken = user?.accessToken
    if (!accessToken) {
      return {
        status: "false",
        message: "no access token found",
        data: []
      }
    }

    const orgMembers = await axios(`https://api.supabase.com/v1/organizations/${orgId}/members`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!orgMembers) {
      return {
        status: "false",
        message: "User has no projects in supabase",
        data: []
      }
    }

    return {
      status: "true",
      message: "projects found",
      data: orgMembers.data
    }
  } catch (err) {
    return {
      status: "false",
      message: "Internal error occured",
      data: []
    }
  }
}
