import { readFileSync, readdirSync } from "node:fs";
import { posix } from "node:path";

function listMarkers(directory: string) {
  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = posix.join(directory, entry.name);
    if (entry.isDirectory()) {
      listMarkers(path);
    } else if (entry.isFile() && /(?:\.md|\.ts)$/.test(entry.name) && !entry.name.endsWith(".test.ts")) {
      const lines = readFileSync(path, "utf8").split(/\r?\n/);
      for (const [index, line] of lines.entries()) {
        const marker = line.match(/\/\/\s*DEMO\b.*?(?=\s*-->\s*$|$)/);
        if (marker) console.log(`${path}:${index + 1}: ${marker[0]}`);
      }
    }
  }
}

listMarkers("src/content");
