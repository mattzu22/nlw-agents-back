CREATE TABLE "limit_ip" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ip_address" text NOT NULL,
	"room_count" numeric,
	"lostcreatedat" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "table_limit_ip" CASCADE;