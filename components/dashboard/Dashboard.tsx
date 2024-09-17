import { getUserProjects } from "@/actions/getUserDetails";
import { ProjectsArray } from "@/types";
import { Project } from "./Project";
import { FeatureWrapper } from "@/components/dashboard/FeatureWrapper";

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
    <div className="mt-6">
      <div>
        <h1 className="text-4xl font-bold gradient-text pb-2">Projects</h1>
        <div className="my-2 flex gap-3 flex-wrap">
          {userProjects.map((proj) => (
            <Project key={proj.id} project={proj} />
          ))}
        </div>
      </div>
      <div className="mt-16">
        <div className="flex flex-row gap-4 ">
          <FeatureWrapper
            headerLabel="Checkout Organization Members"
            buttonHref={`/dashboard/members?org=${organization_id}`}
          />
          <FeatureWrapper
            headerLabel="Checkout your Logs"
            buttonHref="/dashboard/logs"
          />
        </div>
      </div>
    </div>
  );
};
