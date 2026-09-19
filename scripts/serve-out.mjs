/**
 * Serves ./out under /islamictimeline/ with gzip, the way GitHub Pages does, so the
 * local Playwright and Lighthouse runs measure something close to production.
 */
import { createReadStream, statSync, existsSync } from "node:fs";
import { createServer } from "node:http";
import { createGzip } from "node:zlib";
import { extname, join, normalize } from "node:path";

const ROOT = new URL("../out/", import.meta.url).pathname;
const PORT = Number(process.env.PORT ?? 4321);
const BASE = "/islamictimeline";
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".svg", ".txt", ".webmanifest"]);

createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path === BASE) path = `${BASE}/`;
  if (!path.startsWith(`${BASE}/`)) {
    res.writeHead(404).end("not found");
    return;
  }
  let file = join(ROOT, normalize(path.slice(BASE.length + 1)));
  if (file.endsWith("/") || (existsSync(file) && statSync(file).isDirectory()))
    file = join(file, "index.html");
  if (!existsSync(file)) {
    const fallback = join(ROOT, "404.html");
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    if (existsSync(fallback)) createReadStream(fallback).pipe(res);
    else res.end("not found");
    return;
  }
  const ext = extname(file);
  const headers = {
    "content-type": TYPES[ext] ?? "application/octet-stream",
    "cache-control": ext === ".html" ? "no-cache" : "public, max-age=31536000",
  };
  const gzip =
    COMPRESSIBLE.has(ext) && (req.headers["accept-encoding"] ?? "").includes("gzip");
  if (gzip) headers["content-encoding"] = "gzip";
  res.writeHead(200, headers);
  if (gzip) createReadStream(file).pipe(createGzip()).pipe(res);
  else createReadStream(file).pipe(res);
}).listen(PORT, "127.0.0.1", () => {
  console.log(`serving ./out at http://127.0.0.1:${PORT}${BASE}/`);
});
