"use client"

import { Project as ProjectInterface, RLSArray } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { checkRLSTables, getPitrDetails } from "@/actions/getUserDetails";
import { useSession } from "next-auth/react";
import { Check, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

export const Project = ({ project }: { project: ProjectInterface }) => {
  const [PitrStatus, setPitrStatus] = useState(false)
  const [Tables, setTables] = useState<RLSArray | []>([])
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession()
  const user = session.data?.user

  const getDetails = async () => {
    try {
      setIsLoading(true)
      if (!user || !user.id) return

      const response = await getPitrDetails({ userId: user.id, projectId: project.id })
      const response2 = await checkRLSTables({ userId: user.id, projectId: project.id })
      const status: boolean = response.data
      const tables = response2.data
      setTables(tables)
      setPitrStatus(status)
    } catch (err) {
      console.log(err)
    } finally { setIsLoading(false) }
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
        <DialogContent className={cn("sm:w-1/2 w-[350px] rounded-lg bg-white/10 border-none text-white", PitrStatus ? "" : "bg-rose-950")}>
          <DialogHeader>
            <h1 className="text-3xl font-bold gradient-text pb-1">{project.name}</h1>
            <DialogTitle className="text-2xl">Project Details</DialogTitle>
          </DialogHeader>
          {
            isLoading ? (<div>Loading...</div>) : (
              <div>
                <div className="text-md pb-2">
                  <div className=" flex flex-col gap-2">
                    <div className="flex gap-2 text-gray-200">PITR - {PitrStatus ? <Check size={20} /> : <CircleX color="red" size={20} />} </div>
                    <div><span className="text-gray-200">Created At - </span>{new Date(project.created_at).toLocaleDateString()}</div>
                    <div><span className="text-gray-200">Status - </span>{project.status}</div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold pb-2">Row Level Security</h1>
                  <div>
                    {Tables.length > 0 ? Tables.map(table => (
                      <div className="flex text-gray-200 gap-2"><p>{table.relname} - </p> {table.relrowsecurity ? <Check size={20} /> : <CircleX color="red" size={20} />}</div>
                    ))
                      : (<p>User has not created any tables yet</p>)}
                  </div>
                </div>
              </div>
            )}
        </DialogContent>
      </Dialog>
    </div >
  );
};
