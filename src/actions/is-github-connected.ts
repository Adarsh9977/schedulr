'use server'

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function isGithubConnected() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return {
        isConnected: false,
        error: "Unauthorized"
      };
    }

    // Check GitHub connection in database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    const isConnected = Boolean(
      user && user.githubId && user.githubAdded
    );

    return {
      isConnected,
      error: null
    };
    
  } catch (error) {
    console.error("Error checking GitHub status:", error);
    return {
      isConnected: false,
      error: "Failed to check GitHub status"
    };
  }
}