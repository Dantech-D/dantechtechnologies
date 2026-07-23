// Minimal zero-dependency static server for the built Vite SPA.
// Used by TalkSasa Node Droplet as the app start command: `npm start`.
// Serves /dist with SPA fallback so /admin, /shop, etc. work on refresh.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript; charset=utf-8",
  ".mjs":  "application/javascript; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico":  "image/x-icon",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
  ".ttf":  "font/ttf",
  ".map":  "application/json",
  ".txt":  "text/plain; charset=utf-8",
  ".xml":  "application/xml; charset=utf-8",
};

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, headers);
  res.end(body);
};

const server = http.createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    // Prevent path traversal
    const safe = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
    let filePath = path.join(DIST, safe);

    // If it's a directory or root, serve index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    if (!fs.existsSync(filePath)) {
      // SPA fallback: for non-asset requests, serve index.html so React Router handles it
      if (!path.extname(safe)) {
        filePath = path.join(DIST, "index.html");
      } else {
        return send(res, 404, "Not found");
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    const isHtml = ext === ".html";

    const headers = {
      "Content-Type": type,
      "Cache-Control": isHtml
        ? "no-cache, no-store, must-revalidate"
        : "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    };

    fs.createReadStream(filePath)
      .on("open", () => res.writeHead(200, headers))
      .on("error", () => send(res, 500, "Server error"))
      .pipe(res);
  } catch (err) {
    send(res, 500, "Server error");
  }
});

server.listen(PORT, () => {
  console.log(`Dantech site serving ./dist on port ${PORT}`);
});
