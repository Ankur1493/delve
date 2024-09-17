"use client"

import { Project as ProjectInterface } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { getPitrDetails } from "@/actions/getUserDetails";
import { useSession } from "next-auth/react";
import { Check, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

export const Project = ({ project }: { project: ProjectInterface }) => {
  const [PitrStatus, setPitrStatus] = useState(false)
  const session = useSession()
  const user = session.data?.user

  const getDetails = async () => {
    try {
      if (!user || !user.id) return

      const response = await getPitrDetails({ userId: user.id, projectId: project.id })
      console.log(response.data)
      const status: boolean = response.data
      setPitrStatus(status)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild onClick={getDetails}>
          <Card className="w-fit bg-white/10 border-none text-white cursor-pointer">
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
        </DialogTrigger>
        <DialogContent className={cn("sm:w-1/2 bg-white/10 border-none text-white", PitrStatus ? "" : "bg-red-950")}>
          <DialogHeader>
            <DialogTitle className="text-2xl">{project.name}</DialogTitle>
          </DialogHeader>
          <div className="text-md">
            <div className="flex gap-3"><span className="text-gray-400">PITR - </span>{PitrStatus ? <Check /> : <CircleX color="red" />}</div>
            <div><span className="text-gray-400">Created At - </span>{new Date(project.created_at).toLocaleDateString()}</div>
            <div><span className="text-gray-400">Status - </span>{project.status}</div>
          </div>
        </DialogContent>
      </Dialog>
    </div >
  );
};
