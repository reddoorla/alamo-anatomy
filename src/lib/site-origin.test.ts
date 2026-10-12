import { describe, it, expect } from "vitest";
import { PRERENDER_PLACEHOLDER_ORIGIN, siteHref, siteOrigin } from "./site-origin";

const PROD = "https://www.example.com";

describe("siteOrigin and the prerender placeholder", () => {
  it("swaps kit's placeholder for the build's production origin", () => {
    expect(siteOrigin(new URL(`${PRERENDER_PLACEHOLDER_ORIGIN}/about`), PROD)).toBe(PROD);
  });

  it("keeps the requesting host on a live request (the control)", () => {
    const live = new URL("https://deploy-preview-4--alamo-anatomy.netlify.app/about");
    expect(siteOrigin(live, PROD)).toBe("https://deploy-preview-4--alamo-anatomy.netlify.app");
  });

  it("keeps the placeholder when the build had no URL, rather than inventing one", () => {
    expect(siteOrigin(new URL(`${PRERENDER_PLACEHOLDER_ORIGIN}/`), null)).toBe(
      PRERENDER_PLACEHOLDER_ORIGIN,
    );
  });
});

describe("siteHref", () => {
  it("keeps the path and query, and swaps only the origin", () => {
    expect(siteHref(new URL(`${PRERENDER_PLACEHOLDER_ORIGIN}/facility?a=1`), PROD)).toBe(
      `${PROD}/facility?a=1`,
    );
  });

  it("is the href itself on a live request", () => {
    const live = new URL("https://deploy-preview-4--alamo-anatomy.netlify.app/reserve");
    expect(siteHref(live, PROD)).toBe(live.href);
  });
});
