"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Save, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RoutinesPage() {
  const [sleepRoutine, setSleepRoutine] = useState({
    bedtime: "22:30",
    wakeTime: "07:00",
  });
  
  const [meals, setMeals] = useState([
    { id: 1, name: "Breakfast", time: "07:30" },
    { id: 2, name: "Lunch", time: "12:30" },
    { id: 3, name: "Dinner", time: "19:00" },
  ]);
  
  const [activities, setActivities] = useState([
    { id: 1, name: "Exercise", time: "06:30", duration: 45, frequency: "daily" },
    { id: 2, name: "Reading", time: "21:00", duration: 30, frequency: "daily" },
    { id: 3, name: "Meditation", time: "07:15", duration: 15, frequency: "daily" },
  ]);
  
  const [newActivity, setNewActivity] = useState({
    name: "",
    time: "",
    duration: 30,
    frequency: "daily",
  });
  
  const handleAddActivity = () => {
    if (newActivity.name && newActivity.time) {
      setActivities([
        ...activities,
        {
          id: Date.now(),
          ...newActivity,
        },
      ]);
      setNewActivity({
        name: "",
        time: "",
        duration: 30,
        frequency: "daily",
      });
    }
  };
  
  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Daily Routines</h1>
        <Button>Save All Changes</Button>
      </div>
      
      <Tabs defaultValue="sleep" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sleep">Sleep Schedule</TabsTrigger>
          <TabsTrigger value="meals">Meal Times</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Schedule</CardTitle>
              <CardDescription>
                Set your regular sleep and wake times
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bedtime">Bedtime</Label>
                  <Input
                    id="bedtime"
                    type="time"
                    value={sleepRoutine.bedtime}
                    onChange={(e) => setSleepRoutine({ ...sleepRoutine, bedtime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wakeTime">Wake Time</Label>
                  <Input
                    id="wakeTime"
                    type="time"
                    value={sleepRoutine.wakeTime}
                    onChange={(e) => setSleepRoutine({ ...sleepRoutine, wakeTime: e.target.value })}
                  />
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
        
        <TabsContent value="meals">
          <Card>
            <CardHeader>
              <CardTitle>Meal Times</CardTitle>
              <CardDescription>
                Set your regular meal times
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {meals.map((meal) => (
                <div key={meal.id} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`meal-${meal.id}`}>{meal.name}</Label>
                    <Input
                      id={`meal-${meal.id}`}
                      value={meal.name}
                      onChange={(e) => {
                        const updatedMeals = meals.map((m) =>
                          m.id === meal.id ? { ...m, name: e.target.value } : m
                        );
                        setMeals(updatedMeals);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`meal-time-${meal.id}`}>Time</Label>
                    <Input
                      id={`meal-time-${meal.id}`}
                      type="time"
                      value={meal.time}
                      onChange={(e) => {
                        const updatedMeals = meals.map((m) =>
                          m.id === meal.id ? { ...m, time: e.target.value } : m
                        );
                        setMeals(updatedMeals);
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="gap-1"
                onClick={() => {
                  setMeals([
                    ...meals,
                    { id: Date.now(), name: "New Meal", time: "12:00" },
                  ]);
                }}
              >
                <Plus className="h-4 w-4" />
                Add Meal
              </Button>
            </CardContent>
            <CardFooter>
              <Button className="gap-1">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Regular Activities</CardTitle>
              <CardDescription>
                Add your recurring activities and habits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="grid grid-cols-1 gap-4 sm:grid-cols-4 border-b pb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`activity-${activity.id}`}>Activity</Label>
                    <Input
                      id={`activity-${activity.id}`}
                      value={activity.name}
                      onChange={(e) => {
                        const updatedActivities = activities.map((a) =>
                          a.id === activity.id ? { ...a, name: e.target.value } : a
                        );
                        setActivities(updatedActivities);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`activity-time-${activity.id}`}>Time</Label>
                    <Input
                      id={`activity-time-${activity.id}`}
                      type="time"
                      value={activity.time}
                      onChange={(e) => {
                        const updatedActivities = activities.map((a) =>
                          a.id === activity.id ? { ...a, time: e.target.value } : a
                        );
                        setActivities(updatedActivities);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`activity-duration-${activity.id}`}>Duration (min)</Label>
                    <Input
                      id={`activity-duration-${activity.id}`}
                      type="number"
                      value={activity.duration}
                      onChange={(e) => {
                        const updatedActivities = activities.map((a) =>
                          a.id === activity.id ? { ...a, duration: parseInt(e.target.value) } : a
                        );
                        setActivities(updatedActivities);
                      }}
                    />
                  </div>
                  <div className="flex items-end space-x-2">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteActivity(activity.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="new-activity">New Activity</Label>
                  <Input
                    id="new-activity"
                    placeholder="Activity name"
                    value={newActivity.name}
                    onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-activity-time">Time</Label>
                  <Input
                    id="new-activity-time"
                    type="time"
                    value={newActivity.time}
                    onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-activity-duration">Duration (min)</Label>
                  <Input
                    id="new-activity-duration"
                    type="number"
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity({ ...newActivity, duration: parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddActivity} className="gap-1">
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