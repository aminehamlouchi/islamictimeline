/**
 * Where this deployment lives. Canonical, OG and icon URLs are absolute and
 * built from here; the home is aminehamlouchi.com/islamictimeline. Override with
 * NEXT_PUBLIC_SITE_URL (no trailing slash) to deploy elsewhere.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aminehamlouchi.com/islamictimeline"
).replace(/\/$/, "");
