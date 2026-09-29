import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_callout_tone" AS ENUM('sonne', 'linie');
  CREATE TABLE "pages_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"tone" "enum_pages_blocks_callout_tone" DEFAULT 'sonne',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_schedule_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Programm',
  	"aside_title" varchar,
  	"aside_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Euer OK',
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_archive_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Einladungen seit 1987',
  	"text" varchar,
  	"archive_slug" varchar DEFAULT 'archiv',
  	"count" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE "site_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"house" varchar NOT NULL,
  	"names" varchar NOT NULL
  );
  
  ALTER TABLE "site" ADD COLUMN "date" varchar;
  ALTER TABLE "site" ADD COLUMN "intro" varchar;
  ALTER TABLE "site" ADD COLUMN "email" varchar DEFAULT 'fest@wollbi.ch';
  ALTER TABLE "pages_blocks_callout" ADD CONSTRAINT "pages_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_schedule_items" ADD CONSTRAINT "pages_blocks_schedule_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_schedule" ADD CONSTRAINT "pages_blocks_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archive_teaser" ADD CONSTRAINT "pages_blocks_archive_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_team" ADD CONSTRAINT "site_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_callout_order_idx" ON "pages_blocks_callout" USING btree ("_order");
  CREATE INDEX "pages_blocks_callout_parent_id_idx" ON "pages_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_callout_path_idx" ON "pages_blocks_callout" USING btree ("_path");
  CREATE INDEX "pages_blocks_schedule_items_order_idx" ON "pages_blocks_schedule_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_schedule_items_parent_id_idx" ON "pages_blocks_schedule_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_schedule_order_idx" ON "pages_blocks_schedule" USING btree ("_order");
  CREATE INDEX "pages_blocks_schedule_parent_id_idx" ON "pages_blocks_schedule" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_schedule_path_idx" ON "pages_blocks_schedule" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_archive_teaser_order_idx" ON "pages_blocks_archive_teaser" USING btree ("_order");
  CREATE INDEX "pages_blocks_archive_teaser_parent_id_idx" ON "pages_blocks_archive_teaser" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_archive_teaser_path_idx" ON "pages_blocks_archive_teaser" USING btree ("_path");
  CREATE INDEX "site_team_order_idx" ON "site_team" USING btree ("_order");
  CREATE INDEX "site_team_parent_id_idx" ON "site_team" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_callout" CASCADE;
  DROP TABLE "pages_blocks_schedule_items" CASCADE;
  DROP TABLE "pages_blocks_schedule" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_archive_teaser" CASCADE;
  DROP TABLE "site_team" CASCADE;
  ALTER TABLE "site" DROP COLUMN "date";
  ALTER TABLE "site" DROP COLUMN "intro";
  ALTER TABLE "site" DROP COLUMN "email";
  DROP TYPE "public"."enum_pages_blocks_callout_tone";`)
}
