import { Member as MemberInterface } from "@/types"
import { Card, CardHeader, CardTitle } from "../ui/card"

export const Member = ({ member }: { member: MemberInterface }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{member.email}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
