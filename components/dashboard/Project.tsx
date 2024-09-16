import { Project as ProjectInterface } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const Project = ({ project }: { project: ProjectInterface }) => {
  return (
    <div>
      <Card className="w-fit bg-white/10 border-none text-white">
        <div className="p-6">
          <CardHeader className="mb-0 pb-0 p-0">
            <CardTitle className="text-2xl pt-0">
              <div className="font-semibold">{project.name}</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-0 pt-0 p-0 text-sm">
            <div className="text-gray-300">
              <span className="text-white">Id: </span>
              {project.id}
            </div>
            <div className="flex justify-between text-gray-300 gap-6 mt-4">
              <div>{project.status}</div>
              <div>{new Date(project.created_at).toLocaleDateString()}</div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
