/**
 * Every page of the export, for crawlers. Crawlers read robots.txt only at the
 * origin root, which belongs to the portfolio, not to this repository, so this
 * file is referenced from there or submitted by hand; it is not discovered
 * from here.
 */

import type { MetadataRoute } from "next";
import { getAllRecords } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const PAGES = ["/", "/methodology/", "/records/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({ url: `${SITE_URL}${p}` })),
    ...getAllRecords().map((r) => ({ url: `${SITE_URL}/r/${r.id}/` })),
  ];
}
