import { getOrgMembers, getUserProjects } from "@/actions/getUserDetails";
import { MembersArray, ProjectsArray } from "@/types";
import { Project } from "./Project";
import { Card, CardContent, CardTitle } from "../ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface DashboardProps {
  userId: string;
}

export const Dashboard = async ({ userId }: DashboardProps) => {
  const response = await getUserProjects(userId);
  const userProjects: ProjectsArray = response.data;

  const organization_id = userProjects[0].organization_id;
  if (userProjects.length === 0) {
    return <div>No Projects</div>;
  }

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold gradient-text pb-2">Projects</h1>
        <div className="my-2 flex gap-3 flex-wrap">
          {userProjects.map((proj) => (
            <Project key={proj.id} project={proj} />
          ))}
        </div>
      </div>
      <div>
        <div className="flex gap-4">
          <Card className="flex w-1/2 flex-row bg-white/10 border-none justify-around py-6 items-center text-white">
            <Link href={`/dashboard/members?org=${organization_id}`}>
              <CardTitle className="text-4xl">Checkout Organization Members</CardTitle>
              <CardContent className="flex justify-center items-center"><button><ArrowRight /></button></CardContent>
            </Link>
          </Card>
          <Card className="flex w-1/2 flex-row bg-white/10 border-none justify-around py-6 items-center text-white">
            <Link href="/dashboard/logs">
              <CardTitle className="text-4xl">Checkout your Logs</CardTitle>
              <CardContent className="flex justify-center items-center"><button><ArrowRight /></button></CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};
