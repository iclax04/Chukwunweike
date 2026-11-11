import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || "8080");
const nitroEntry = join(rootDir, ".output", "server", "index.mjs");

async function startNitroServer() {
  if (!existsSync(nitroEntry)) return false;

  const { createServer } = await import("node:http");
  const nitro = await import(nitroEntry);
  const handler = typeof nitro.default === "function" ? nitro.default : nitro.fetch ?? nitro.handler;

  if (typeof handler !== "function") return false;

  const server = createServer(handler);
  server.listen(port, "0.0.0.0", () => {
    console.log(`Nitro server listening on http://0.0.0.0:${port}`);
  });
  return true;
}

async function startFallbackServer() {
  const viteBin = join(rootDir, "node_modules", "vite", "bin", "vite.js");
  const child = spawn(process.execPath, [viteBin, "dev", "--host", "0.0.0.0", "--port", String(port)], {
    cwd: rootDir,
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "production",
    },
  });

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });

  child.on("error", (error) => {
    console.error("Failed to start the app:", error);
    process.exit(1);
  });
}

const started = await startNitroServer();
if (!started) {
  await startFallbackServer();
}
