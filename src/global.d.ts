/** Netlify's URL at build time, or null (vite.config.js `define`). */
declare const __REDDOOR_SITE_ORIGIN__: string | null;

interface VimeoPlayer {
  on(event: string, callback: () => void): void;
  ready(): Promise<void>;
}

interface Window {
  Vimeo?: { Player: new (el: HTMLIFrameElement) => VimeoPlayer };
}
