import { siteOrigin } from "$lib/site-origin";

export const prerender = true;

export async function GET({ url }) {
  const body = `User-agent: *
Disallow:

Sitemap: ${siteOrigin(url)}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
