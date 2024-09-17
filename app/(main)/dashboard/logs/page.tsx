import { getAllLogs } from "@/data/logs";
import { Logs } from "@/components/dashboard/Logs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function LogsPage() {
  const response = await getAllLogs();
  const logs = response.data;

  if (logs.length === 0) {
    return (
      <div className="text-5xl md:text-8xl font-semibold gradient-text w-3/4 text-center">
        There are no logs yet
      </div>
    );
  }

  return (
    <ScrollArea className="h-screen md:h-[450px] space-y-4">
      <div className="space-y-4">
        {logs.map((log) => (
          <Logs
            key={log.id}
            message={log.message}
            status={log.status}
            type={log.type}
            createdAt={log.createdAt}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
