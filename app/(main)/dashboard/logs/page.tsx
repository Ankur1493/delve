import { getAllLogs } from "@/data/logs"

export default async function DashboardPage() {
  const response = await getAllLogs()
  const logs = response.data

  if (logs.length === 0) {
    return (<div>There are no logs yet</div>)
  }

  return (
    <div>
      {logs.map(log => (
        <div key={log.id}>{log.message}</div>
      ))}
    </div>
  )
}
