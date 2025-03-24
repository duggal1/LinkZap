CREATE TABLE "urls" (
	"id" serial PRIMARY KEY NOT NULL,
	"original_url" varchar(2000) NOT NULL,
	"short_code" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "urls_short_code_unique" UNIQUE("short_code")
);
