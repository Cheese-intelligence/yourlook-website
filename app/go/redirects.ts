import { ANDROID_PLAY_STORE_URL, IOS_APP_STORE_URL } from "../constants";

export interface RedirectConfig {
  destination: string;
  status?: 301 | 302 | 307 | 308;
}

export type RedirectTarget = string | RedirectConfig;

export const DEFAULT_GO_REDIRECT = "/";

/**
 * Marketing redirect map for `/go/[slug]`.
 *
 * Add, remove, or update entries here.
 * - Keys are matched case-insensitively without leading/trailing slashes.
 * - Values can be a relative path (e.g. `"/install?ref=flyer"`), an external URL,
 *   or `{ destination, status }`.
 */
export const GO_REDIRECTS: Record<string, RedirectTarget> = {
  app: "/install",
  ios: IOS_APP_STORE_URL,
  android: ANDROID_PLAY_STORE_URL,

  // Marketing campaigns (adjust or add new slugs here)
  qr: "/install?ref=qr",
  nfc: "/install?ref=nfc",
};
