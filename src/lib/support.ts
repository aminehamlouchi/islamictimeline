/**
 * Support / donation configuration, the single place to edit these links.
 * Set `enabled: false` to hide all support UI.
 */
export const SUPPORT = {
  enabled: true,
  name: "Amine Hamlouchi",
  /** Link hub with all socials & support options. */
  linkHub: "https://aminehamlouchi.com/links/",
  cashApp: {
    tag: "$IbnHamlouchi",
    url: "https://cash.app/$IbnHamlouchi",
  },
  /** ms of exploration before the one-time card appears (never again once dismissed). */
  autoShowAfterMs: 75_000,
} as const;
