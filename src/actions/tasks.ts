'use server'

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";


const getStatusEnum = (status: string) => {
    switch (status) {
        case "pending":
            return "pending";
        case "in_progress":
            return "in_progress";
        case "completed":
            return "completed";
        default:
            return "pending";
    }
}

const getTypeEnum = (type: string) => {
    switch (type) {
        case "daily":
            return "daily";
        case "weekly":
            return "weekly";
        case "monthly":
            return "monthly";
        default:
            return "daily";
    }
}


export async function createTask(data: FormData) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return {
            message: "You must be logged in to do this.",
            status: 401,
        };
    }

    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const dueDate = new Date(data.get("dueDate") as string); // Convert string to Date object
    const priority = data.get("priority") as string;
    const status = data.get("status") as string;
    const type = data.get("type") as string;
    const userId = session.user.id;

    const statusEnum = getStatusEnum(status);
    const typeEnum = getTypeEnum(type);

    try {
        const task = await prisma.task.create({
            data: {
                userId,
                title,
                description,
                dueDate,
                priority: parseInt(priority),
                status : statusEnum,
                type: typeEnum,
            },
        });

        console.log(task);

        return {
            message: "Task created successfully.",
            status: 201,
            data: task,
        };
    } catch (error) {
        return {
            message: "Something went wrong.",
            status: 500,
        };
    }
}

export const getTasks = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return {
            message: "You must be logged in to do this.",
            status: 401,
        };
    }

    const userId = session.user.id;

    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId,
            },
        });

        return {
            message: "Tasks retrieved successfully.",
            status: 200,
            data: tasks,
        };
    } catch (error) {
        return {
            message: "Something went wrong.",
            status: 500,
        };
    }
}

export const updateTask = async (data: FormData) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return {
            message: "You must be logged in to do this.",
            status: 401,
        };
    }
    const id = data.get("id") as string;
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const dueDate = new Date(data.get("dueDate") as string); // Convert string to Date object
    const priority = data.get("priority") as string;
    const status = data.get("status") as string;
    const type = data.get("type") as string;
    const userId = session.user.id;

    const statusEnum = getStatusEnum(status);
    const typeEnum = getTypeEnum(type);

    try {
        const task = await prisma.task.update({
            where: {
                id,
                userId,
            },
            data: {
                title,
                description,
                dueDate,
                priority: parseInt(priority),
                status : statusEnum,
                type: typeEnum,
            },
        });
        return {
            message: "Task updated successfully.",
            status: 200,
            data: task,
        };
    } catch (error) {
        return {
            message: "Something went wrong.",
            status: 500,
        };
    }
}

export const deleteTask = async (id: string) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return {
            message: "You must be logged in to do this.",
            status: 401,
        };
    }

    const userId = session.user.id;

    try {
        const task = await prisma.task.delete({
            where: {
                id,
                userId,
            },
        });
        return {
            message: "Task deleted successfully.",
            status: 200,
            data: task,
        };
    } catch (error) {
        return {
            message: "Something went wrong.",
            status: 500,
        };
    }
}