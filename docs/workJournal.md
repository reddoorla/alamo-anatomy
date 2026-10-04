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

## 2026-10-04 — Off Slice Machine, onto the Prismic CLI, with no slices to move (reddoor-maintenance#1090, `claude/prismic-cli`)

Phase 4 of the fleet migration (reddoor-maintenance
`docs/prismic-migration-plan-2026-10.md`), following espada#79. Slice Machine
is deprecated by Prismic since 2026-09-18; models are now edited in the Type
Builder, and the generated files come from `pnpm prismic:gen`.

**This was the outlier: a slice library that did not exist.**
`slicemachine.config.json` named `libraries: ["./src/lib/slices"]`, there was
no such directory, and `/slice-simulator` rendered `<SliceZone {slices} />`
with no components. The question was the smallest correct shape, and the CLI
answered it. Run against the missing directory, `prismic gen types` and
`prismic gen slice-index` both exit 0, and slice-index _creates_
`src/lib/slices/index.ts` with an empty `components` map. `libraries: []` is
accepted by the config schema, and so is omitting the key, but neither means
"no library": the CLI's `getSliceLibraries()` treats an empty or absent list
as "use the default", which for SvelteKit is `src/lib/slices/`. All three
configs produced byte-identical types and index files. A
`"libraries": "nope"` config is rejected ("prismic.config.json is invalid"),
so the schema is really being checked. No config stops slice-index writing an
index, so the library stays explicit, the empty index is committed, the
simulator imports `components` from it, and `prismic-codegen` checks both
files like every other site. The alternative, a types-only `prismic:gen` and
gate, would diverge from the fleet in three places and would go stale silently
on the first slice: a temporary slice model made the gate rewrite the index
(`mutation_probe: MutationProbe`), which a types-only gate would not have
compared.

**Types moved to the project root.** Without the `src/app.d.ts` import,
svelte-check went from 0 errors (origin/main, 584 files) to 1
(`[uid]/+page.server.ts`: `uid: string | null` is not `string`, because the
untyped client loses the `page` model). With it, 0 errors. The regenerated
file exports the same 12 type names and the same 90 API ID paths as the
Slice Machine file.

**No framing change.** The site does not opt into the central CSP, has no
`hooks.server`, and `netlify.toml` sets only Cache-Control.
`/slice-simulator` is prerendered. On vite preview (origin/main and the
branch), `/`, `/slice-simulator`, `/contact`, `/health` and `/about` send
neither X-Frame-Options nor a CSP; so does alamo-anatomy.netlify.app for `/`,
`/slice-simulator`, `/about`, `/contact` and `/health` (read 22:05Z). The same
header grep found both headers on prismic.io and google.com, so the absence is
a reading, not a blind spot.

**In sync with Prismic, proven through the connector.** Alamo is `launching`,
so the nightly drift sweep skips it and the 2026-10-04 log has no line for it.
A read-only comparison of the six local custom types against
`get_custom_type` found no differences across 82 top-level fields (tabs, field
keys, type, config). The same script, run first on a copy with a changed
placeholder, an added field and an added slice-zone choice, reported all three.
`list_shared_slices` is empty, and so is the local library.
