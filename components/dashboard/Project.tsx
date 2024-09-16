import { Project as ProjectInterface } from "@/types"
import { Card, CardHeader, CardTitle } from "../ui/card"

export const Project = ({ project }: { project: ProjectInterface }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
