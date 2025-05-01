"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"

export function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete project proposal", completed: false },
    { id: 2, title: "Schedule team meeting", completed: true },
    { id: 3, title: "Review quarterly goals", completed: false },
    { id: 4, title: "Prepare presentation", completed: false },
  ])
  const [newTask, setNewTask] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask.trim(), completed: false }])
      setNewTask("")
      setIsAdding(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Tasks</CardTitle>
        <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => setIsAdding(!isAdding)}>
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="mb-4 flex gap-2">
            <Input
              placeholder="Enter new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <Button onClick={addTask}>Add</Button>
          </div>
        )}
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-2 rounded-lg border p-3">
              <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} id={`task-${task.id}`} />
              <label
                htmlFor={`task-${task.id}`}
                className={`flex-1 cursor-pointer ${task.completed ? "text-gray-400 line-through" : ""}`}
              >
                {task.title}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
