ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_session_id_chat_sessions_id_fk";
--> statement-breakpoint
ALTER TABLE "chat_messages" ALTER COLUMN "content" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "chat_messages" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "chat_messages" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "chat_sessions" ALTER COLUMN "lesson_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "chat_sessions" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "chat_sessions" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "chunks" ALTER COLUMN "created_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "chunks" ALTER COLUMN "updated_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "created_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "updated_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "lessons" ALTER COLUMN "created_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "lessons" ALTER COLUMN "updated_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "created_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "updated_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "created_at" SET DEFAULT '2026-06-16 09:09:38.353';--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "updated_at" SET DEFAULT '2026-06-16 09:09:38.353';--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "created_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "updated_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "started_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "created_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "updated_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "transcripts" ALTER COLUMN "created_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "transcripts" ALTER COLUMN "updated_at" SET DEFAULT '2026-06-16 09:09:38.354';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2026-06-16 09:09:38.353';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2026-06-16 09:09:38.353';--> statement-breakpoint
ALTER TABLE "chat_messages" ADD COLUMN "token_count" integer;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD COLUMN "sources" jsonb;--> statement-breakpoint
ALTER TABLE "chat_sessions" ADD COLUMN "course_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "chat_sessions" ADD COLUMN "last_message_at" timestamp;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_session_id_chat_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."chat_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_sessions" ADD CONSTRAINT "chat_sessions_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;