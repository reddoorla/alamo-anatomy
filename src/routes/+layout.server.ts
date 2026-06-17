import type { LayoutServerLoad } from "./$types";

export const prerender = "auto";

export const load: LayoutServerLoad = async ({ cookies }) => {
  // The Prismic toolbar (<PrismicPreview>) injects ~21 third-party cookies for
  // every visitor, which tanks the Lighthouse "Best Practices" score. Only
  // editors who arrive via a Prismic preview link have this cookie set, so we
  // use it to gate mounting the toolbar to actual preview sessions.
  const isPreviewSession = !!cookies.get("io.prismic.preview");

  return { isPreviewSession };
};
