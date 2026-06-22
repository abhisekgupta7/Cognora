"use server"
import { cache } from "react";
import { auth } from "@/auth";
export type ActiveOrgContext = {
  userId: number;
  orgId: number;
  role?: "OWNER" | "ADMIN" | "MEMBER";
};

const getCachedSession = cache(async () => auth());

export async function getActiveOrgContext(): Promise<ActiveOrgContext | null> {
  const session = await getCachedSession();

  console.log("DEBUG session:", JSON.stringify(session, null, 2));

  if (!session?.user?.id || !session?.user?.activeOrgId) {
    console.log("DEBUG missing:", { 
      hasSession: !!session, 
      userId: session?.user?.id, 
      activeOrgId: session?.user?.activeOrgId 
    });
    return null;
  }

  const userId: number = parseInt(session.user.id);
  const orgId: number = parseInt(session.user.activeOrgId);

  return {
    userId,
    orgId,
    role: session.user.role,
  };
}

export async function requireActiveOrgContext(): Promise<ActiveOrgContext> {
  const context = await getActiveOrgContext();

  if (!context) {
    throw new Error("Unauthorized");
  }

  return context;
}

export async function getActiveOrgId(): Promise<number | null> {
  const context = await getActiveOrgContext();
  return context ? context.orgId : null;
}
export async function getActiveUserId(): Promise<number | null> {
  const context = await getActiveOrgContext();
  return context ? context.userId : null;
}