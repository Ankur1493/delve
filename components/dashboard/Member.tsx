import { Member as MemberInterface } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check } from "lucide-react";
import { CircleX } from "lucide-react";

export const Member = ({
  member,
  index,
}: {
  member: MemberInterface;
  index: number;
}) => {
  return (
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
        <TableRow key={member.user_id}>
          <TableCell>{index}</TableCell>
          <TableCell>{member.user_id}</TableCell>
          <TableCell className="font-medium">{member.user_name}</TableCell>
          <TableCell>{member.role_name}</TableCell>
          <TableCell>{member.email}</TableCell>
          {member.mfa_enabled ? (
            <TableCell className="flex justify-end">
              <Check color="green" />
            </TableCell>
          ) : (
            <TableCell className="flex justify-end">
              <CircleX color="red" />
            </TableCell>
          )}
        </TableRow>
      </TableBody>
    </Table>
  );
};
