/** The origin SvelteKit gives `url` while prerendering, when no `paths.origin`
 *  is set (kit 3: core/postbuild/prerender.js). */
export const PRERENDER_PLACEHOLDER_ORIGIN = "http://sveltekit-prerender";

const BUILD_ORIGIN = typeof __REDDOOR_SITE_ORIGIN__ === "string" ? __REDDOOR_SITE_ORIGIN__ : null;

/**
 * The origin a page names itself by. Per request it is the host that asked.
 * While prerendering, kit's placeholder is replaced with Netlify's production
 * `URL` from the build (sveltekit.config.js says why `paths.origin` is not set).
 */
export function siteOrigin(
  url: Pick<URL, "origin">,
  buildOrigin: string | null = BUILD_ORIGIN,
): string {
  return url.origin === PRERENDER_PLACEHOLDER_ORIGIN && buildOrigin ? buildOrigin : url.origin;
}

/** `url.href` with {@link siteOrigin}'s origin. */
export function siteHref(
  url: Pick<URL, "origin" | "href">,
  buildOrigin: string | null = BUILD_ORIGIN,
): string {
  return siteOrigin(url, buildOrigin) + url.href.slice(url.origin.length);
}
