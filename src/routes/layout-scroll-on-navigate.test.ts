import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";

vi.setConfig({ testTimeout: 60_000 });
import { render, cleanup } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterNavigate } from "$app/navigation";

vi.mock("$app/navigation", () => ({
  afterNavigate: vi.fn(),
  beforeNavigate: vi.fn(),
  goto: vi.fn(() => Promise.resolve()),
  refreshAll: vi.fn(() => Promise.resolve()),
}));
vi.mock("$app/state", () => ({
  page: { data: {}, url: new URL("https://example.com/"), params: {}, status: 200 },
}));

type Nav = { from: { url: URL } | null; to: { url: URL } | null; type: string };

const page = createRawSnippet(() => ({ render: () => "<p>page</p>" }));
const scrollTo = vi.fn();

beforeEach(() => {
  window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
});

afterEach(() => {
  cleanup();
  scrollTo.mockClear();
  vi.mocked(afterNavigate).mockClear();
});

async function navigate(from: string, to: string, type = "goto") {
  const { default: Layout } = await import("./+layout.svelte");
  render(Layout, { data: { isPreviewSession: true }, children: page });
  const callback = vi.mocked(afterNavigate).mock.calls[0][0] as unknown as (nav: Nav) => void;
  callback({
    from: { url: new URL(from, "https://example.com") },
    to: { url: new URL(to, "https://example.com") },
    type,
  });
}

describe("the layout's scroll reset on navigation", () => {
  it("keeps the reader's place when a preview ends on the same page", async () => {
    await navigate("/preview/about", "/about");
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("keeps the place when a preview of the home page ends", async () => {
    await navigate("/preview", "/");
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("still scrolls to the top on a move to another page", async () => {
    await navigate("/about", "/contact");
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("still scrolls to the top when leaving a preview for another page", async () => {
    await navigate("/preview/about", "/contact");
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("does not treat a path that only starts with the word preview as a preview", async () => {
    await navigate("/previewer/about", "/er/about");
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("does not scroll on a same-page navigation", async () => {
    await navigate("/about", "/about#team");
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
