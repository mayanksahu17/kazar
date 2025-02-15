import { DashboardShell } from "@/components/student-dashboard";

export default function DashboardPage() {
  return (
    <>
      <DashboardShell>
        <div className="w-[100%] flex-1 space-y-6 p-6 md:p-10 bg-gradient-to-b from-blue-50 to-green-50 rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-300 pb-4">
            <h2 className="text-3xl font-bold tracking-tight text-blue-600">
              Dashboard
            </h2>
          </div>

          {/* Task List Placeholder */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <p className="text-gray-700 text-lg text-center">
              📌 Your tasks will appear here soon!
            </p>
          </div>

          {/* Uncomment when TasksList is ready */}
          {/* <TasksList /> */}
        </div>
      </DashboardShell>
    </>
  );
}
