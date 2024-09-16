import { getOrgMembers, getUserProjects } from "@/actions/getUserDetails";
import { MembersArray, ProjectsArray } from "@/types";
import { Project } from "./Project";
import { Member } from "./Member";

interface DashboardProps {
  userId: string;
}

export const Dashboard = async ({ userId }: DashboardProps) => {
  const response = await getUserProjects(userId);
  const userProjects: ProjectsArray = response.data;

  const organization_id = userProjects[0].organization_id
  const response2 = await getOrgMembers({ userId, orgId: organization_id })
  const orgMembers: MembersArray = response2.data;

  if (userProjects.length === 0) {
    return <div>No Projects</div>;
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl">Projects</h1>
        {userProjects.map((proj) => (
          <Project key={proj.id} project={proj} />
        ))}
      </div>
      <div>
        <h1 className="text-3xl">Members</h1>
        {orgMembers.map((member) => (
          <Member key={member.user_id} member={member} />
        ))}
      </div>
    </div>
  );
};

