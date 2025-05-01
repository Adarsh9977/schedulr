"use server"

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

interface scheduleForm {
    wakeTime: string,
    sleepTime: string,
    breakfast: string,
    lunch: string,
    dinner: string,
  }

export async function createSchedule(data: scheduleForm) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return {
            message: "You must be logged in to do this.",
            status: 401,
        };
    }


    const userId = session.user.id;
    const wakeTime = data.wakeTime
    const sleepTime = data.sleepTime
    const breakfast = data.breakfast;
    const lunch = data.lunch;
    const dinner = data.dinner;

    console.log(data, userId);


    try {
        const schedule = await prisma.schedule.create({
            data: {
                userId: userId,
                wakeTime: wakeTime,
                sleepTime: sleepTime,
                breakfast: breakfast,
                lunch: lunch,
                dinner: dinner,
            },
        });

        console.log(schedule);

        return {
            message: "Schedule created successfully.",
            status: 201,
            data: schedule,
        };
    } catch (error) {
        return {
            message: "Something went wrong.",
            status: 500,
        };
    }
}

export async function getSchedules() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return {
            message: "You must be logged in to do this.",
            status: 401,
        };
    }

    const userId = session.user.id;

    try {
        const schedules = await prisma.schedule.findMany({
            where: {
                userId,
            },
        });

        return {
            message: "Schedules retrieved successfully.",
            status: 200,
            data: schedules,
        };
    } catch (error) {
        return {
            message: "Something went wrong.",
            status: 500,
        };
    }
}

export async function updateSchedule(data: FormData) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return {
            message: "You must be logged in to do this.",
            status: 401,
        };
    }
    const id = data.get("id") as string;
    const start = data.get("start") as string;
    const end = data.get("end") as string;
    const wakeTime = start
    const sleepTime = end
    const breakfast = data.get("breakfast") as string;
    const lunch = data.get("lunch") as string;
    const dinner = data.get("dinner") as string;

    try {
        const schedule = await prisma.schedule.update({
            where: {
                id:id,
                userId: session.user.id,
            },
            data: {
                wakeTime,
                sleepTime,
                breakfast,
                lunch,
                dinner,
            },
        });
        return {
            message: "Schedule updated successfully.",
            status: 200,
            data: schedule,
        };
    } catch (error) {
        return {
            message: "Something went wrong.",
            status: 500,
        };
    }
}