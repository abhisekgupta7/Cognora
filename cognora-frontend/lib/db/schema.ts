import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
  jsonb,
  vector,
  text,
} from "drizzle-orm/pg-core";

enum paymentstatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELED = "CANCELED",
}
enum subscriptionstatus {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
}

enum subscriptionplan {
  FREE = "FREE",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

export const organizations = pgTable("organizations", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  publicId: uuid("public_id").defaultRandom().unique().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  created_at: timestamp("created_at").default(new Date()),
  updated_at: timestamp("updated_at").default(new Date()),
});

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  clerk_id: varchar("clerk_id", { length: 256 }).unique(),
  org_id: integer("org_id")
    .notNull()
    .references(() => organizations.id),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }).unique(),
  password_hash: varchar("password_hash", { length: 256 }),
  image: varchar("image", { length: 256 }),
  created_at: timestamp("created_at").default(new Date()),
  updated_at: timestamp("updated_at").default(new Date()),
});

export const memberships = pgTable("memberships", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  org_id: integer("org_id")
    .notNull()
    .references(() => organizations.id),
  role: varchar("role", { length: 50 }).notNull().default("MEMBER"),
  created_at: timestamp("created_at").default(new Date()),
  updated_at: timestamp("updated_at").default(new Date()),
});

export const payments = pgTable("payments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  org_id: integer("org_id")
    .notNull()
    .references(() => organizations.id),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 10 }).notNull(),
  product_id: varchar("product_id", { length: 256 }).notNull(),
  product_name: varchar("product_name", { length: 256 }).notNull(),
  status: varchar("status", { length: 50 })
    .notNull()
    .default(paymentstatus.PENDING),
  created_at: timestamp("created_at").default(new Date()),
  updated_at: timestamp("updated_at").default(new Date()),
});

export const subscriptions = pgTable("subscriptions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  org_id: integer("org_id")
    .notNull()
    .references(() => organizations.id),
  plan: varchar("plan", { length: 50 })
    .notNull()
    .default(subscriptionplan.FREE),
  status: varchar("status", { length: 50 })
    .notNull()
    .default(subscriptionstatus.ACTIVE),
  started_at: timestamp("started_at").default(new Date()),
  ended_at: timestamp("ended_at"),
  created_at: timestamp("created_at").default(new Date()),
  updated_at: timestamp("updated_at").default(new Date()),
});

export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  org_id: integer("org_id")
    .notNull()
    .references(() => organizations.id),
  description: varchar("description", { length: 256 }),
  created_at: timestamp("created_at").default(new Date()),
  updated_at: timestamp("updated_at").default(new Date()),
});

export const lessons = pgTable("lessons", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  course_id: uuid("course_id")
    .notNull()
    .references(() => courses.id),
  org_id: integer("org_id")
    .notNull()
    .references(() => organizations.id),

  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 1000 }),
  lesson_video_url: varchar("lesson_video_url", { length: 256 }),
  quiz: jsonb("quiz"),
  created_at: timestamp("created_at").default(new Date()),
  updated_at: timestamp("updated_at").default(new Date()),
});

export const transcripts = pgTable("transcripts", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  lesson_id: uuid("lesson_id")
    .notNull()
    .references(() => lessons.id),
  org_id: integer("org_id")
    .notNull()
    .references(() => organizations.id),

  original_transcript: text("original_transcript"),
  translated_transcript: text("translated_transcript"),
  language: varchar("language", { length: 50 }),
  created_at: timestamp("created_at").default(new Date()),
  updated_at: timestamp("updated_at").default(new Date()),
});

export const chunks = pgTable("chunks", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  course_id: uuid("course_id")
    .notNull()
    .references(() => courses.id),
  lesson_id: uuid("lesson_id")
    .notNull()
    .references(() => lessons.id),
  org_id: integer("org_id")
    .notNull()
    .references(() => organizations.id),
  chunk_index: integer("chunk_index").notNull(),
  chunk_text: varchar("chunk_text", { length: 10000 }).notNull(),
  embedding: vector("embedding", { dimensions: 3072 }).notNull(),
  token_count: integer("token_count").notNull(),
  created_at: timestamp("created_at").default(new Date()),
  updated_at: timestamp("updated_at").default(new Date()),
});

export const chat_sessions = pgTable("chat_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),

  title: varchar("title", { length: 256 }).notNull(),

  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),

  org_id: integer("org_id")
    .notNull()
    .references(() => organizations.id),

  course_id: uuid("course_id")
    .notNull()
    .references(() => courses.id),

  lesson_id: uuid("lesson_id").references(() => lessons.id),

  thread_id: varchar("thread_id", { length: 256 }).notNull(),

  last_message_at: timestamp("last_message_at"),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const chat_messages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),

  session_id: uuid("session_id")
    .notNull()
    .references(() => chat_sessions.id, {
      onDelete: "cascade",
    }),

  org_id: integer("org_id")
    .notNull()
    .references(() => organizations.id),

  role: varchar("role", { length: 50 }).notNull(),

  content: text("content").notNull(),

  token_count: integer("token_count"),

  sources: jsonb("sources"),

  metadata: jsonb("metadata"),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
