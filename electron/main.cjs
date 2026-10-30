const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const http = require("node:http");
const fs = require("node:fs");

const RENDERER_DIR = path.join(__dirname, "..", "electron-renderer");

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

// A tiny local static server (loopback-only) for the renderer build, with
// SPA fallback so React Router's client-side routes (e.g. /admin/login)
// resolve correctly on a hard load, not just on in-app navigation.
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const filePath = path.join(RENDERER_DIR, urlPath);

      if (!filePath.startsWith(RENDERER_DIR)) {
        res.writeHead(403);
        res.end();
        return;
      }

      fs.readFile(filePath, (err, data) => {
        if (err) {
          fs.readFile(path.join(RENDERER_DIR, "index.html"), (err2, indexData) => {
            if (err2) {
              res.writeHead(404);
              res.end("Not found");
              return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(indexData);
          });
          return;
        }
        const ext = path.extname(filePath);
        res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
        res.end(data);
      });
    });

    server.listen(0, "127.0.0.1", () => resolve(server.address().port));
  });
}

function createWindow(port) {
  const win = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 1024,
    minHeight: 700,
    title: "Vismaya Management",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // The page's own <title> ("Vismaya Unisex Salon", shared with the public
  // site build) would otherwise override this window's title.
  win.on("page-title-updated", (event) => event.preventDefault());

  // Open directly into the management portal rather than the public
  // marketing site — this app is only ever used as the internal tool.
  win.loadURL(`http://127.0.0.1:${port}/admin/login`);
}

app.whenReady().then(async () => {
  const port = await startServer();
  createWindow(port);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow(port);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
