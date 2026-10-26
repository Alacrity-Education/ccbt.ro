import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Not the generated statement, which was a bare
  //   ALTER TABLE "forms" ADD COLUMN "slug" varchar NOT NULL;
  // and cannot run here: Postgres refuses to add a NOT NULL column with no
  // default to a table that already has rows, and this one has the centre's
  // forms in it. The column has to arrive empty, be filled, and only then be
  // constrained.
  await db.execute(sql`
   ALTER TABLE "forms" ADD COLUMN "generate_slug" boolean DEFAULT true;
  ALTER TABLE "forms" ADD COLUMN "slug" varchar;`)

  // The same slug Payload would have written, spelled in SQL: trim, spaces to
  // hyphens, drop everything that is not a word character or a hyphen, lower
  // case. The character class is written out rather than as `\w` on purpose —
  // Postgres reads `\w` against the database locale and would keep `ă` and
  // `ș`, where JavaScript's drops them, and the two would disagree the first
  // time an editor renamed a form.
  //
  // A title that leaves nothing behind falls back to "form", and a slug that
  // two forms would share takes the id of the later one. The unique index
  // below is what would catch any case this misses, loudly, before the column
  // is relied upon.
  await db.execute(sql`
   WITH slugged AS (
    SELECT
      id,
      COALESCE(
        NULLIF(lower(regexp_replace(replace(btrim(title), ' ', '-'), '[^A-Za-z0-9_-]+', '', 'g')), ''),
        'form'
      ) AS base
    FROM forms
  ),
  numbered AS (
    SELECT id, base, row_number() OVER (PARTITION BY base ORDER BY id) AS rn FROM slugged
  )
  UPDATE forms f
  SET slug = n.base || CASE WHEN n.rn > 1 THEN '-' || f.id::text ELSE '' END
  FROM numbered n
  WHERE n.id = f.id;`)

  // Frozen for the forms that already exist. The checkbox means "keep this
  // slug in step with the title", and these slugs were derived after the fact
  // from titles written without one in mind — leaving it on would mean a
  // rename silently changing a URL the static site posts to. New forms get
  // the field's own default and behave normally.
  await db.execute(sql`UPDATE forms SET generate_slug = false;`)

  await db.execute(sql`
   ALTER TABLE "forms" ALTER COLUMN "slug" SET NOT NULL;
  CREATE UNIQUE INDEX "forms_slug_idx" ON "forms" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "forms_slug_idx";
  ALTER TABLE "forms" DROP COLUMN "generate_slug";
  ALTER TABLE "forms" DROP COLUMN "slug";`)
}
