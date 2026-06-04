export const prerender = true;

export async function GET({ url }) {
  const body = `User-agent: *
Disallow:

Sitemap: ${url.origin}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
