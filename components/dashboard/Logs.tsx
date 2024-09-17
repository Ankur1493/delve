import { LogType } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

interface LogsProps {
  message: string;
  status: boolean;
  type: LogType;
  createdAt: Date;
}

export const Logs = ({ message, status, type, createdAt }: LogsProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <Card
      className={cn("w-full shadow-md bg-opacity-20 flex flex-col justify-center  text-gray-300 border-transparent ",
        status ? "bg-green-600" : "bg-red-600"
      )}
    >
      <CardContent className="flex items-center justify-between h-full pt-6 ">
        <div>Type: {type}</div>
        <div>Created At: {formattedDate}</div>
        <div className="w-[500px]">Message: {message}</div>
      </CardContent>
    </Card>
  );
};
