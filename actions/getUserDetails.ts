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

export const getPitrDetails = async ({ userId, projectId }: { userId: string, projectId: string }) => {

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

    const response = await axios(`https://api.supabase.com/v1/projects/${projectId}/database/backups`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      return {
        status: "false",
        message: "User has no projects in supabase",
        data: false
      }
    }

    return {
      status: "true",
      message: "projects found",
      data: response.data.pitr_enabled
    }
  } catch (err) {
    console.log({ err })
    return {
      status: "false",
      message: "Internal error occured",
      data: false
    }
  }
}

export const checkRLSTables = async ({ userId, projectId }: { userId: string, projectId: string }) => {
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
    const response = await axios.post(
      `https://api.supabase.com/v1/projects/${projectId}/database/query`,
      {
        query: `SELECT relname, relrowsecurity FROM pg_class WHERE relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
        AND relname NOT LIKE '%_id_seq' AND relname NOT LIKE '%_pkey';
`
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response) {
      return {
        status: "false",
        message: "User has no tables in this project",
        data: []
      }
    }

    return {
      status: "true",
      message: "projects found",
      data: response.data
    }

  } catch (error) {
    console.error('Error fetching RLS status:', error);
    return {
      status: "false",
      message: "User has no tables in this project",
      data: []
    }
  }
}

