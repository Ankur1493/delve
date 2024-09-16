import { getOrgMembers } from "@/actions/getUserDetails";
import { auth } from "@/auth";
import { Member } from "@/components/dashboard/Member";
import { MembersArray } from "@/types";
import { redirect } from "next/navigation";

export default async function MembersPage({
  searchParams,
}: {
  searchParams: { org: string };
}) {
  const session = await auth();
  const user = session?.user;
  const orgId = searchParams.org;

  if (!user?.id) redirect("/login");
  if (!orgId) redirect("/dashboard");

  const response = await getOrgMembers({ userId: user.id, orgId });
  const orgMembers: MembersArray = response.data;

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold gradient-text pb-2">Members</h1>
        <div className="my-2 flex gap-3 flex-wrap">
          {orgMembers.map((member) => (
            <Member key={member.user_id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}

