"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import  db  from "@/lib/db/index";
import { organizations } from "@/lib/db/schema";
import { getActiveOrgContext } from "../services/org-context.service";

const updateOrgSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
});

export async function getActiveOrganizationDetails() {
  try {
    const context = await getActiveOrgContext();

    if (!context) {
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const org = await db
      .select({
        id: organizations.id,
        name: organizations.name,
      })
      .from(organizations)
      .where(eq(organizations.id, context.orgId))
      .limit(1);

    return {
      success: true,
      data: org[0] || null,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch organization",
      data: null,
    };
  }
}

export async function updateActiveOrganizationDetails(input: { name: string }) {
  const parsed = updateOrgSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid organization data",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const context = await getActiveOrgContext();

    if (!context) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const [updated] = await db
      .update(organizations)
      .set({
        name: parsed.data.name.trim(),
        updated_at: new Date(),
      })
      .where(eq(organizations.id, context.orgId))
      .returning({
        id: organizations.id,
        name: organizations.name,
      });

    return {
      success: true,
      message: "Organization updated successfully",
      data: updated,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update organization",
    };
  }
}
