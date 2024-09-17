import { Member as MemberInterface } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
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
    <TableRow key={member.user_id} className="border-none">
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
  );
};
