"use server";

import db from "@/lib/db/index";
import { organizations, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface CreateUserInput {
  email: string;
  name: string;
  password?: string;
  image?: string;
}

/**
 * Find user by email
 */
export async function findUserByEmail(email: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user[0] || null;
}

/**
 * Find user by ID
 */
export async function findUserById(id: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, parseInt(id)))
    .limit(1);

  return user[0] || null;
}

/**
 * Create new user (for email/password signup)
 */
export async function createUser(input: CreateUserInput) {
  const { email, name } = input;
  let defaultOrg;
  try {
    defaultOrg = await db
      .insert(organizations)
      .values({
        name: "Temporary Org",
      })
      .returning();
  } catch (error) {
    throw new Error("Failed to create default organization for new user");
  }

  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // For now, create with org_id 1 as temporary. Will be updated when organization is created
  const result = await db
    .insert(users)
    .values({
      email,
      clerk_id: null,
      name,
      org_id: defaultOrg[0].id, // Use the ID of the created default organization
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning();

  return result[0];
}

/**
 * Authenticate user with email and password
 */
export async function authenticateUser(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user || !user.password_hash) {
    throw new Error("Invalid email or password");
  }

  return user;
}
