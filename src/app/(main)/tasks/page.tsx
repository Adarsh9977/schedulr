"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save, Trash2 } from 'lucide-react';

export default function TasksPage() {
  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, title: "Review emails", completed: true, priority: "high" },
    { id: 2, title: "Team meeting", completed: false, priority: "medium" },
    { id: 3, title: "Work on project", completed: false, priority: "high" },
    { id: 4, title: "Exercise", completed: false, priority: "medium" },
  ]);
  
  const [weeklyTasks, setWeeklyTasks] = useState([
    { id: 1, title: "Complete project proposal", completed: false, priority: "high", dueDay: "Friday" },
    { id: 2, title: "Weekly review", completed: false, priority: "medium", dueDay: "Friday" },
    { id: 3, title: "Grocery shopping", completed: false, priority: "low", dueDay: "Saturday" },
  ]);
  
  const [newDailyTask, setNewDailyTask] = useState({
    title: "",
    priority: "medium",
  });
  
  const [newWeeklyTask, setNewWeeklyTask] = useState({
    title: "",
    priority: "medium",
    dueDay: "Friday",
  });
  
  const handleAddDailyTask = () => {
    if (newDailyTask.title) {
      setDailyTasks([
        ...dailyTasks,
        {
          id: Date.now(),
          title: newDailyTask.title,
          completed: false,
          priority: newDailyTask.priority,
        },
      ]);
      setNewDailyTask({
        title: "",
        priority: "medium",
      });
    }
  };
  
  const handleAddWeeklyTask = () => {
    if (newWeeklyTask.title) {
      setWeeklyTasks([
        ...weeklyTasks,
        {
          id: Date.now(),
          title: newWeeklyTask.title,
          completed: false,
          priority: newWeeklyTask.priority,
          dueDay: newWeeklyTask.dueDay,
        },
      ]);
      setNewWeeklyTask({
        title: "",
        priority: "medium",
        dueDay: "Friday",
      });
    }
  };
  
  const toggleDailyTaskCompletion = (id: number) => {
    setDailyTasks(
      dailyTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const toggleWeeklyTaskCompletion = (id: number) => {
    setWeeklyTasks(
      weeklyTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const deleteDailyTask = (id: number) => {
    setDailyTasks(dailyTasks.filter((task) => task.id !== id));
  };
  
  const deleteWeeklyTask = (id: number) => {
    setWeeklyTasks(weeklyTasks.filter((task) => task.id !== id));
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <Button>Save All Changes</Button>
      </div>
      
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily Tasks</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Tasks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Tasks</CardTitle>
              <CardDescription>
                Manage your daily to-do list
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {dailyTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between space-x-2 border-b pb-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleDailyTaskCompletion(task.id)}
                      />
                      <Label
                        htmlFor={`task-${task.id}`}
                        className={`${
                          task.completed ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {task.title}
                      </Label>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteDailyTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Input
                  placeholder="Add a new task"
                  value={newDailyTask.title}
                  onChange={(e) =>
                    setNewDailyTask({ ...newDailyTask, title: e.target.value })
                  }
                  className="sm:flex-1"
                />
                <Select
                  value={newDailyTask.priority}
                  onValueChange={(value) =>
                    setNewDailyTask({ ...newDailyTask, priority: value })
                  }
                >
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleAddDailyTask} className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="gap-1">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Tasks</CardTitle>
              <CardDescription>
                Manage your weekly to-do list
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {weeklyTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between space-x-2 border-b pb-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`weekly-task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleWeeklyTaskCompletion(task.id)}
                      />
                      <Label
                        htmlFor={`weekly-task-${task.id}`}
                        className={`${
                          task.completed ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {task.title}
                      </Label>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Due: {task.dueDay}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteWeeklyTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
                <Input
                  placeholder="Add a new task"
                  value={newWeeklyTask.title}
                  onChange={(e) =>
                    setNewWeeklyTask({ ...newWeeklyTask, title: e.target.value })
                  }
                  className="sm:col-span-2"
                />
                <Select
                  value={newWeeklyTask.priority}
                  onValueChange={(value) =>
                    setNewWeeklyTask({ ...newWeeklyTask, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex space-x-2">
                  <Select
                    value={newWeeklyTask.dueDay}
                    onValueChange={(value) =>
                      setNewWeeklyTask({ ...newWeeklyTask, dueDay: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Due Day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                      <SelectItem value="Wednesday">Wednesday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                      <SelectItem value="Friday">Friday</SelectItem>
                      <SelectItem value="Saturday">Saturday</SelectItem>
                      <SelectItem value="Sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddWeeklyTask} className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="gap-1">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}