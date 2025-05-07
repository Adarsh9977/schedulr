import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check GitHub connection in database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        githubId: true,
        githubUsername: true,
        githubAdded: true
      }
    });

    const isConnected = Boolean(
      user && (user.githubId || user.githubUsername || user.githubAdded)
    );

    return NextResponse.json({ isConnected });
  } catch (error) {
    console.error("Error checking GitHub status:", error);
    return NextResponse.json(
      { error: "Failed to check GitHub status" },
      { status: 500 }
    );
  }
}