import { getOrgMembers } from "@/actions/getUserDetails";
import { auth } from "@/auth";
import { Member } from "@/components/dashboard/Member";
import { MembersArray } from "@/types";
import { redirect } from "next/navigation";
import { Table, TableHeader, TableHead, TableRow, TableBody } from "@/components/ui/table";
import { createLog } from "@/data/logs";
import { LogType } from "@prisma/client";

export default async function MembersPage({
  searchParams,
}: {
  searchParams: { org: string };
}) {
  const session = await auth();
  const user = session?.user;
  const orgId = searchParams.org;

  if (!user?.id) redirect("/login");

  const response = await getOrgMembers({ userId: user.id, orgId });
  const orgMembers: MembersArray = response.data;
  const disabledCount = orgMembers.reduce((acc, member) => {
    if (!member.mfa_enabled) acc += 1;
    return acc;
  }, 0);
  await createLog({ userId: user.id, type: LogType.MFA, status: true, message: `number of MFA disabled members - ${disabledCount}` })

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold gradient-text pb-2">Members</h1>
        <div>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>S. No.</TableHead>
                <TableHead>User_ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">MFA_ENABLED</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orgMembers.map((member, index) => (
                <Member
                  key={member.user_id}
                  member={member}
                  index={index + 1}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

