import { xai } from "@ai-sdk/xai";
import { streamText } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages } = await req.json();

    const actions = [
        'create-schedule',
        'get-schedules',
        'update-schedule',
        'delete-schedule',
        'get-tasks',
        'create-task',
        'update-task',
        'delete-task',
        'get-routines',
        'create-routine',
        'update-routine',
        'delete-routine',
    ];



    // If not a scheduling request or date parsing failed, proceed with normal chat
    const response = await streamText({
      model: xai("grok-3"),
      prompt: messages.map((message: any) => message.content).join("\n"),
      system:
        "You are an AI assistant specialized in schedule management and productivity. Help the user optimize their daily routines, manage tasks, and provide advice on time management.",
    });

    // Create a readable stream for the response
    const stream = new ReadableStream({
    async start(controller) {
        try {
        for await (const chunk of response.textStream) {
            controller.enqueue(new TextEncoder().encode(chunk));
        }
        controller.close();
        } catch (err) {
        console.error("Stream error:", err);
        controller.error(err);
        }
    },
    });

    return new NextResponse(stream, {
    headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
    },
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
