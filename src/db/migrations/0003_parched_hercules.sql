CREATE TABLE "table_limit_ip" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ip_address" text NOT NULL,
	"room_count" text NOT NULL,
	"lostcreatedat" timestamp DEFAULT now() NOT NULL
);
