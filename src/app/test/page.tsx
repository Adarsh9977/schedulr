'use client'

import { useState } from 'react'
import { getSchedule } from '@/actions/ai-scheduler'
import { createSchedule } from '@/actions/schedule'
interface scheduleForm {
  wakeTime: string,
  sleepTime: string,
  breakfast: string,
  lunch: string,
  dinner: string,
}
export default function TestPage() {
  const [aiSchedule, setAiSchedule] = useState<string>('')
  const [loading, setLoading] = useState(false)
 const [formData, setFormData] = useState<scheduleForm>({
    wakeTime: '',
    sleepTime: '',
    breakfast: '',
    lunch: '',
    dinner: '',
  })

  const handleGetAISchedule = async () => {
    try {
      setLoading(true)
      const result :  any = await getSchedule()
      if (result.success) {
        setAiSchedule(result.schedule)
      } else {
        console.error(result.error)
      }
    } catch (error) {
      console.error('Failed to get AI schedule:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitSchedule = async () => {
    const form : scheduleForm = {
        wakeTime: formData.wakeTime,
        sleepTime: formData.sleepTime,
        breakfast: formData.breakfast,
        lunch: formData.lunch,
        dinner: formData.dinner,
      }
    try {
      setLoading(true)
      const result :  any = await createSchedule(form)
      if (result.success) {
        console.log(result.data)
      } else {
        console.error(result.error)
      }
    } catch (error) {
      console.error('Failed to update schedule:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Server Actions Test Page</h1>

      {/* AI Schedule Section */}
      <section className="mb-8 p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">AI Schedule Generator</h2>
        <button
          onClick={handleGetAISchedule}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate AI Schedule'}
        </button>

        {aiSchedule && (
          <div className="mt-4">
            <h3 className="text-xl font-medium mb-2">Generated Schedule:</h3>
            <pre className="bg-gray-900 p-4 rounded-md whitespace-pre-wrap">
              {aiSchedule}
            </pre>
          </div>
        )}
      </section>

      {/* Task Management Section */}
      <section className="mb-8 p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Task Management</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Task Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter task description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add Task
          </button>
        </form>
      </section>

      {/* Schedule Management Section */}
      <section className="mb-8 p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Schedule Management</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Wake Time</label>
            <input type="time" className="w-full px-3 py-2 border rounded-md" onChange={(e) => setFormData({...formData, wakeTime: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sleep Time</label>
            <input type="time" className="w-full px-3 py-2 border rounded-md" onChange={(e) => setFormData({...formData, sleepTime: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Breakfast Time</label>
            <input type="time" className="w-full px-3 py-2 border rounded-md" onChange={(e) => setFormData({...formData, breakfast: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Lunch Time</label>
            <input type="time" className="w-full px-3 py-2 border rounded-md" onChange={(e) => setFormData({...formData, lunch: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Dinner Time</label>
            <input type="time" className="w-full px-3 py-2 border rounded-md" onChange={(e) => setFormData({...formData, dinner: e.target.value})} />
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            onClick={handleSubmitSchedule}
          >
            Update Schedule
          </button>
        </form>
      </section>

      {/* Activities Section */}
      <section className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Activities Management</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Activity Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter activity name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input type="time" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input type="time" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="isRecurring" className="mr-2" />
            <label htmlFor="isRecurring" className="text-sm font-medium">
              Is Recurring Activity
            </label>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Add Activity
          </button>
        </form>
      </section>
    </div>
  )
}