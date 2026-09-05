# Alamo Anatomy — Work Journal

Running log of build work: what was done, why, and where it landed.
Chronological — newest entry at the bottom. [README.md](../README.md) says what
the stack ships; this is the history of getting it there.

The convention is in [CLAUDE.md](../CLAUDE.md) under "The work journal". In
short: every working session appends a dated entry, prose over bullets, why
over what, and history is never edited to be right — a later entry corrects an
earlier one and says so.

---

## 2026-09-05 — Journal opened, and 80 commits of history summarised rather than reconstructed (`chore/work-journal`)

The journal starts today, so this first entry is a **backfill**: a deliberately
coarse summary of what came before, written from the commit log rather than
from memory. Detail below this line is trustworthy; detail above it is not, and
nothing here should be cited as though someone wrote it down at the time. The
commit log remains the record for anything before 2026-09-05.

**What this repo is.** The website for the Alamo Anatomy Training Institute
(AATI) — an anatomy training facility whose lab you book, which is what the
`reserve` form is really for: it collects station counts, tissue type, and
whether the booking needs a C-arm, drills or an arthroscope. SvelteKit 2 /
Svelte 5 / Tailwind v4 / Prismic on Netlify, from an **early** fork of the
Reddoor starter — early enough that there is no slice library here at all.
Content is five single-instance custom types (`home`, `about`, `facility`,
`reserve`, `contact`), each with numbered section fields (`s1_eyebrow`,
`s1_heading`), plus an unused repeatable `page`. `src/lib/slices` does not
exist.

**The eras.** 80 commits, all inside one calendar year: 2026-03-24 to
2026-09-01. March (9) and May (10) are the site itself, built by hand in terse
commits — "init homepage", "sticky nav", "initial add of other pages", "mobile
fixes" — with the yarn→pnpm switch on 2026-05-11. Then it stops. **After
2026-05-26 the log contains no design or content work at all**, with one
exception, `250cfef`, which lifted the footer copyright's opacity 60→80 for
contrast. The other 60 are fleet maintenance — a ratio worth stating plainly
rather than discovering later.

June is the largest month (36) and is the onboarding to
`@reddoorla/maintenance`: a run of `chore: sync … config` commits pulling
eslint, prettier, playwright-a11y, lighthouse and svelte configs in from the
fleet, #4 adopting the reusable CI workflow and org Renovate preset as thin
shims, Node 24 + pnpm 11 (#6), the shared Typekit kit `noj4tji` (#7, #8), and
contact + reserve rerouted to the central dashboard ingest (#5). July (11) is
the rest of the fleet's per-site apparatus — Turnstile on the contact form
(#23), the `/health` probe (#25), the smoke suite (#26), and a prerender
origin so canonical, sitemap and robots emit the real host instead of
localhost (#24). August (12) and September (2) are near-pure Renovate, but for
CI on `staging` pushes (#48) and capped Prismic srcset widths with a real
`sizes` on every image (#51), which came down from the starter.

**State as of this entry.** `chore/work-journal`, cut from `main` at
`6541ca5`, tree clean, nothing in flight. Eight branches on the remote outlive
their merged PRs and can be pruned. Note there is **no `pnpm verify`** here —
that gate belongs to the newer starter; CI is the reusable `reddoorla/.github`
workflow at v1.4.1, and locally the checks are still separate (`pnpm lint`,
`pnpm check`, `pnpm test`, `pnpm test:smoke`).

**What changed today.** This repo had no `CLAUDE.md`, so one was created — a
short orientation plus the journal convention — and this file exists.
