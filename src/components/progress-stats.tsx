"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ProgressStats() {
  // Mock data for progress stats
  const stats = [
    { name: "Tasks Completed", value: 65, color: "bg-blue-500" },
    { name: "Routine Adherence", value: 82, color: "bg-green-500" },
    { name: "Productivity Score", value: 74, color: "bg-purple-500" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{stat.name}</span>
                <span className="text-sm font-medium">{stat.value}%</span>
              </div>
              <Progress value={stat.value} className={stat.color} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
