"use server";

import  db from "@/lib/db/index";
import { memberships, organizations } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export type MembershipRole = "OWNER" | "ADMIN" | "MEMBER";

export interface MembershipWithOrg {
  id: string;
  userId: string;
  organizationId: string;
  role: string;
  organizationName: string;
}

/**
 * Create organization and membership in transaction
 */
export async function createOrganizationWithMembership(
  userId: string,
  organizationName: string,
  role: MembershipRole = "OWNER",
) {
  try {
    const baseName = organizationName.trim() || "Business";
    const uniqueOrganizationName = `${baseName} (${userId.slice(0, 8)})`;

    return await db.transaction(async (tx: any) => {
      const [organization] = await tx
        .insert(organizations)
        .values({
          name: uniqueOrganizationName,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning();

      const [membership] = await tx
        .insert(memberships)
        .values({
          user_id: parseInt(userId),
          org_id: organization.id,
          role,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning();

      return { organization, membership };
    });
  } catch (error) {
    console.error("Failed to create organization with membership:", error);
    throw new Error("Failed to create organization");
  }
}

/**
 * Get all memberships for a user with organization details
 */
export async function getUserMemberships(userId: string) {
  const userMemberships = await db
    .select({
      id: memberships.id,
      userId: memberships.user_id,
      organizationId: memberships.org_id,
      role: memberships.role,
      organizationName: organizations.name,
    })
    .from(memberships)
    .innerJoin(
      organizations,
      eq(memberships.org_id, organizations.id),
    )
    .where(eq(memberships.user_id, parseInt(userId)));

  return userMemberships;
}

/**
 * Get active membership for user
 * Returns the first/primary membership (you can customize this logic)
 */
export async function getActiveOrgForUser(userId: string) {
  const memberships = await getUserMemberships(userId);

  if (memberships.length === 0) {
    throw new Error("No organization found for user");
  }

  // Return first membership or implement custom logic
  return memberships[0];
}

/**
 * Verify user has membership in organization with specific role
 */
export async function verifyMembership(
  userId: string,
  organizationId: string,
  minRole?: MembershipRole,
) {
  const membership = await db
    .select()
    .from(memberships)
    .where(
      and(
        eq(memberships.user_id, parseInt(userId)),
        eq(memberships.org_id, parseInt(organizationId)),
      ),
    )
    .limit(1);

  if (!membership[0]) {
    return null;
  }

  // Check role if minRole is specified
  if (minRole) {
    const roleHierarchy: Record<MembershipRole, number> = {
      OWNER: 3,
      ADMIN: 2,
      MEMBER: 1,
    };

    if (
      (roleHierarchy[membership[0].role as MembershipRole] || 0) <
      roleHierarchy[minRole]
    ) {
      return null;
    }
  }

  return membership[0];
}

/**
 * Get organization by ID
 */
export async function getOrganizationById(organizationId: string) {
  const org = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, parseInt(organizationId)))
    .limit(1);

  return org[0] || null;
}
