import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/svelte/kit";
import config from "../../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = import.meta.env.VITE_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 *
 * @type {prismic.ClientConfig["routes"]}
 */
const routes = [
  { type: "home", path: "/" },
  { type: "about", path: "/about" },
  { type: "facility", path: "/facility" },
  { type: "contact", path: "/contact" },
  { type: "reserve", path: "/reserve" },
  { type: "page", path: "/:uid" },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param {import('@prismicio/svelte/kit').CreateClientConfig} config - Configuration for the Prismic client.
 */
export const createClient = ({ cookies, ...config } = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    ...config,
  });

  enableAutoPreviews({ client, cookies });

  return client;
};
