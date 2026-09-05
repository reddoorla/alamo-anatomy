# CLAUDE.md

The website for the **Alamo Anatomy Training Institute** (AATI) — an anatomy
training facility whose lab visitors book through the `/reserve` form.
SvelteKit 2 / Svelte 5 / Tailwind v4 / Prismic, deployed on Netlify, from an
early fork of the Reddoor starter.

What an agent working here needs to know that the code does not say loudly:

- **There is no slice library.** `src/lib/slices` does not exist. Content is
  five single-instance Prismic custom types — `home`, `about`, `facility`,
  `reserve`, `contact` — each with numbered section fields (`s1_eyebrow`,
  `s1_heading`, …), plus a repeatable `page` type nothing currently uses. Do
  not reach for slice patterns from the newer starter; they are not wired here.
- **There is no `pnpm verify`.** That gate belongs to the newer starter. Here
  the checks are separate: `pnpm lint`, `pnpm check`, `pnpm test`,
  `pnpm test:smoke`. CI is the reusable `reddoorla/.github` workflow (v1.4.1),
  which runs on pushes to `main` and `staging` and on every PR.
- **The root layout sets `prerender = "auto"`, and a form action cannot run on
  a prerendered route.** `/contact` and `/reserve` therefore set
  `prerender = false` themselves. Any new route with an action must do the same.
- **Forms go to the central dashboard ingest**, not to Netlify Forms, via
  `createIngestAction` from `@reddoorla/maintenance/forms`. It needs
  `FORMS_INGEST_URL` and `FORMS_INGEST_TOKEN` in Netlify's env — never commit
  the real URL, as Netlify's secrets scanner fails the build on it.
- **`src/prismicio-types.d.ts` is generated** by Slice Machine (`pnpm dev` runs
  it alongside Vite). Hand edits do not survive.

## The work journal

**Every working session appends a dated entry to `docs/workJournal.md`** — what
was done and **why**, newest at the bottom, never corrected in place. Write it
as the last act of the session, not the first act of the next one.

The journal is the history of executing the build. Code says what the system
does now; the journal says what it used to do, what it cost to change, and
which beliefs turned out to be wrong. Nearly everything expensive to rediscover
lives there and nowhere else.

An entry is headed with the date, a short title, and where it landed:

```markdown
## 2026-09-04 — Both runway stages render their final frame without JS (#51, `ce46ae0`)
```

Then prose — not a bullet list of file names, which the diff already tells you.
What to put in, in rough order of value:

- **Why, over what.** The reason a thing was done survives; the diff does not
  need restating.
- **Measured numbers, exactly.** "The comp's open mask is 2696×2352 on an 860px
  band — 2.735× the band's height, so a 390×664 phone needs ~534%" is worth
  keeping. "Fixed the hero on mobile" is not.
- **Defects, named.** What broke, what it looked like, and what made it
  invisible until it wasn't.
- **What was tried and abandoned**, and what it would take to revive it. A dead
  end nobody wrote down gets walked twice.
- **Beliefs corrected on contact.** The design assumption that turned out false
  is usually the most valuable line in the entry.
- **Honest accounting.** If a win came from somewhere other than the change
  that claimed it, say so — that is exactly what someone will otherwise
  over-invest in next.

**History is never edited to be right.** An entry that stops being true is not
rewritten; a later entry corrects it, and says which one it corrects. The
journal is a record of what was believed at the time, and that record is most
useful precisely where it was wrong. Fixing the past in place destroys the only
evidence of how the mistake was made.

If a session produced nothing worth an entry, that is itself worth one line.
