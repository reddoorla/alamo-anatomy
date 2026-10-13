import { createKitConfig } from "@reddoorla/maintenance/configs/svelte";
import adapter from "@sveltejs/adapter-netlify";

// VITE_REDDOOR_GATE_FIXTURES=1 builds the /dev fixtures into the bundle, for
// the a11y gate's own build and nothing else (src/routes/dev/+layout.server.ts,
// reddoor-maintenance#948). Set on Netlify it would deploy them, so refuse it
// there, at module load.
if (process.env.VITE_REDDOOR_GATE_FIXTURES && process.env.NETLIFY) {
  throw new Error(
    "VITE_REDDOOR_GATE_FIXTURES is set on Netlify: it builds the /dev fixtures into the " +
      "deployed site. It belongs to the a11y gate's own build (reddoor-maint audit) only. " +
      "Unset it in the Netlify environment.",
  );
}

// Netlify sets URL to the site's production origin during a build, and
// prerendered pages bake it into canonical, og:url, og:image, the JSON-LD url,
// every sitemap.xml <loc> and the robots.txt Sitemap line. Kit 2 took it as
// `prerender.origin`. Kit 3 removed that for `paths.origin`, which also
// becomes the ONLY origin the CSRF check accepts a form POST from, so /contact
// and /reserve would answer 403 on any other host (reddoor-starter#187). So it
// is not set: kit keeps its "http://sveltekit-prerender" placeholder, and
// vite.config.js hands this origin to $lib/site-origin, which puts it in place
// of the placeholder. Local builds set no URL and keep the placeholder, which
// only shows up in build/ output, never in dev.
/** @param {string | undefined} value */
const originOf = (value) => {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.origin : undefined;
  } catch {
    return undefined;
  }
};
export const productionOrigin = originOf(process.env.URL) ?? null;

// SvelteKit 3 refuses `svelte.config.js` (`config_file_unsupported`): its
// configuration is passed to the `sveltekit(...)` plugin in vite.config.js,
// top-level, with no `kit` namespace. It lives here rather than inline so
// eslint.config.js and scripts/kit-config.test.ts read the same object.
export default createKitConfig({
  adapter: adapter({ edge: false, split: false }),
});
