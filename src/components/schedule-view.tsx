"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ScheduleView() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  const nextDay = () => {
    const next = new Date(currentDate)
    next.setDate(next.getDate() + 1)
    setCurrentDate(next)
  }

  const prevDay = () => {
    const prev = new Date(currentDate)
    prev.setDate(prev.getDate() - 1)
    setCurrentDate(prev)
  }

  // Mock schedule data
  const scheduleItems = [
    { time: "07:00 AM", activity: "Wake up", completed: true, type: "routine" },
    { time: "07:30 AM", activity: "Breakfast", completed: true, type: "routine" },
    { time: "08:30 AM", activity: "Work on project", completed: false, type: "task" },
    { time: "10:00 AM", activity: "Team meeting", completed: false, type: "task" },
    { time: "12:00 PM", activity: "Lunch", completed: false, type: "routine" },
    { time: "01:00 PM", activity: "Email responses", completed: false, type: "task" },
    { time: "03:00 PM", activity: "Exercise", completed: false, type: "routine" },
    { time: "05:00 PM", activity: "Review day's progress", completed: false, type: "task" },
    { time: "06:30 PM", activity: "Dinner", completed: false, type: "routine" },
    { time: "09:00 PM", activity: "Reading", completed: false, type: "routine" },
    { time: "10:30 PM", activity: "Sleep", completed: false, type: "routine" },
  ]

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Daily Schedule</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{formatDate(currentDate)}</span>
          <Button variant="outline" size="icon" onClick={nextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scheduleItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 rounded-lg border p-3">
              <div className="flex-shrink-0 text-sm font-medium text-gray-500">{item.time}</div>
              <div className="flex-1">
                <div className="font-medium">{item.activity}</div>
                <div className="text-xs text-gray-500 capitalize">{item.type}</div>
              </div>
              <div className="flex-shrink-0">
                <div className={`h-3 w-3 rounded-full ${item.completed ? "bg-green-500" : "bg-gray-200"}`} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
