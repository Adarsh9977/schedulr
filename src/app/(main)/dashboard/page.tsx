import type { Metadata } from "next"
import { ScheduleView } from "@/components/schedule-view"
import { TaskList } from "@/components/task-list"
import { RoutinesList } from "@/components/routines-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ProgressStats } from "@/components/progress-stats"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Dashboard - ScheduleAI",
  description: "Manage your daily schedule and tasks",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/generate">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Generate Schedule
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <ScheduleView />
        </div>
        <div className="space-y-6">
          <ProgressStats />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <TaskList />
        </div>
        <div>
          <RoutinesList />
        </div>
      </div>
    </div>
  )
}
