'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const getSchedule = async () => {
    try {
        // Get current user
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            throw new Error("Unauthorized");
        }

        const userId = session.user.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get user's schedule preferences
        const userSchedule = await prisma.schedule.findFirst({
            where: { userId },
            select: {
                wakeTime: true,
                sleepTime: true,
                breakfast: true,
                lunch: true,
                dinner: true,
            }
        });

        // Get today's tasks
        const tasks = await prisma.task.findMany({
            where: {
                userId,
                OR: [
                    { type: 'daily' },
                    {
                        type: 'weekly',
                        dueDate: {
                            gte: today
                        }
                    }
                ]
            }
        });

        // Get recurring activities
        const activities = await prisma.activity.findMany({
            where: {
                schedule: {
                    userId
                },
                isRecurring: true
            }
        });

        console.log(tasks, activities, userSchedule);

        // Prepare prompt for Gemini
        const prompt = `As an AI schedule optimizer, create a detailed daily schedule based on the following information:

        Wake up time: ${userSchedule?.wakeTime}
        Sleep time: ${userSchedule?.sleepTime}
        Breakfast time: ${userSchedule?.breakfast}
        Lunch time: ${userSchedule?.lunch}
        Dinner time: ${userSchedule?.dinner}

        Today's Tasks:
        ${tasks.map(task => `- ${task.title} (Priority: ${task.priority})`).join('\n')}

        Regular Activities:
        ${activities.map(activity => `- ${activity.name} (${activity.startTime} - ${activity.endTime})`).join('\n')}

        Please create an optimized schedule that:
        1. Respects fixed meal times and regular activities
        2. Prioritizes tasks based on their priority level
        3. Includes short breaks between activities
        4. Considers natural energy levels throughout the day
        5. Maintains a healthy work-life balance

        Format the response as a structured schedule with specific time slots.`;

        // Generate schedule using Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const schedule = response.text();

        return {
            success: true,
            schedule,
            baseSchedule: userSchedule,
            tasks,
            activities
        };
    } catch (error) {
        console.error('Error generating schedule:', error);
        return {
            success: false,
            error: 'Failed to generate schedule'
        };
    }
}