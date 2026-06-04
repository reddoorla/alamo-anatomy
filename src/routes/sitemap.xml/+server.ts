import { createClient } from "$lib/prismicio";

export const prerender = true;

const SINGLE_TYPES = [
  { type: "home", path: "/" },
  { type: "about", path: "/about" },
  { type: "facility", path: "/facility" },
  { type: "contact", path: "/contact" },
  { type: "reserve", path: "/reserve" },
] as const;

function toIsoDate(value: string | undefined): string | undefined {
  return value ? value.slice(0, 10) : undefined;
}

export async function GET({ url, fetch }) {
  const client = createClient({ fetch });

  const entries: Array<{ path: string; lastmod?: string }> = [];

  await Promise.all(
    SINGLE_TYPES.map(async ({ type, path }) => {
      try {
        const doc = await client.getSingle(type);
        entries.push({ path, lastmod: toIsoDate(doc.last_publication_date) });
      } catch {
        entries.push({ path });
      }
    }),
  );

  try {
    const pages = await client.getAllByType("page");
    for (const p of pages) {
      entries.push({ path: `/${p.uid}`, lastmod: toIsoDate(p.last_publication_date) });
    }
  } catch {
    // no pages yet — that's fine
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    ({ path, lastmod }) => `	<url>
		<loc>${url.origin}${path}</loc>${lastmod ? `\n\t\t<lastmod>${lastmod}</lastmod>` : ""}
		<changefreq>monthly</changefreq>
	</url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
