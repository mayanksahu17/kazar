import { DashboardShell } from "@/components/student-dashboard"
import { TasksList } from "@/components/task-list"

export default function DashboardPage() {
  return (
    <>
    <DashboardShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <TasksList />
      </div>
    </DashboardShell>
    </>
  )
}

