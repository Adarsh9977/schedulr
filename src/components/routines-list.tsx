"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RoutinesList() {
  const [routines, setRoutines] = useState([
    { id: 1, name: "Morning Routine", startTime: "07:00", endTime: "08:30" },
    { id: 2, name: "Lunch Break", startTime: "12:00", endTime: "13:00" },
    { id: 3, name: "Exercise", startTime: "17:00", endTime: "18:00" },
    { id: 4, name: "Evening Routine", startTime: "21:00", endTime: "22:30" },
  ])
  const [open, setOpen] = useState(false)
  const [newRoutine, setNewRoutine] = useState({
    name: "",
    startTime: "",
    endTime: "",
  })

  const addRoutine = () => {
    if (newRoutine.name && newRoutine.startTime && newRoutine.endTime) {
      setRoutines([...routines, { id: Date.now(), ...newRoutine }])
      setNewRoutine({ name: "", startTime: "", endTime: "" })
      setOpen(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Daily Routines</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Plus className="h-4 w-4" />
              Add Routine
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Routine</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Routine Name</Label>
                <Input
                  id="name"
                  value={newRoutine.name}
                  onChange={(e) => setNewRoutine({ ...newRoutine, name: e.target.value })}
                  placeholder="e.g., Morning Routine"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newRoutine.startTime}
                    onChange={(e) => setNewRoutine({ ...newRoutine, startTime: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newRoutine.endTime}
                    onChange={(e) => setNewRoutine({ ...newRoutine, endTime: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={addRoutine} className="mt-2">
                Add Routine
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {routines.map((routine) => (
            <div key={routine.id} className="flex items-center gap-3 rounded-lg border p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{routine.name}</div>
                <div className="text-sm text-gray-500">
                  {routine.startTime} - {routine.endTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
