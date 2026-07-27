import {
  copyFile,
  cp,
  mkdir,
  readdir,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";

const exportDirectory = ".sites-static-output";
const excludedEntries = new Set([".openai", "cache", "server", "static", "types"]);

await rm(exportDirectory, { recursive: true, force: true });
await rename("dist", exportDirectory);
await mkdir("dist/client", { recursive: true });

for (const entry of await readdir(exportDirectory, { withFileTypes: true })) {
  if (excludedEntries.has(entry.name)) {
    continue;
  }

  await cp(
    `${exportDirectory}/${entry.name}`,
    `dist/client/${entry.name}`,
    { recursive: true },
  );
}

await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
await writeFile(
  "dist/server/index.js",
  `export default {
    async fetch(request, env) {
      const response = await env.ASSETS.fetch(request);

      if (response.status !== 404) {
        return response;
      }

      const url = new URL(request.url);
      const fallbackPath =
        url.pathname === "/"
          ? "/index.html"
          : url.pathname.endsWith("/")
            ? \`\${url.pathname.slice(0, -1)}.html\`
            : \`\${url.pathname}.html\`;

      return env.ASSETS.fetch(
        new Request(new URL(fallbackPath, request.url), request),
      );
    },
  };
  `,
  "utf8",
);

await rm(exportDirectory, { recursive: true, force: true });
