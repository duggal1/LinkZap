ALTER TABLE "urls" ADD COLUMN "flagged" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "urls" ADD COLUMN "flag_reason" text;