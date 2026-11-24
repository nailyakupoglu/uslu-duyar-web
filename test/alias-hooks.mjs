/**
 * Amaç: Test çalışırken `@/` ve src içi uzantısız importları dosyaya çevirir.
 * Prop'lar: Node resolve hook (specifier, context, nextResolve).
 * Kullanım: register-alias.mjs tarafından yüklenir.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const srcRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");

function withExtension(base) {
  const candidates = [base, `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.mjs`];
  return candidates.find((candidate) => existsSync(candidate) && !candidate.endsWith("/"));
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier === "next/server") {
    return nextResolve("next/server.js", context);
  }

  if (specifier.startsWith("@/")) {
    const match = withExtension(path.join(srcRoot, specifier.slice(2)));
    if (match) return nextResolve(pathToFileURL(match).href, context);
  }

  if (specifier.startsWith(".") && context.parentURL) {
    const parentPath = fileURLToPath(context.parentURL);
    if (parentPath.startsWith(srcRoot)) {
      const match = withExtension(path.resolve(path.dirname(parentPath), specifier));
      if (match) return nextResolve(pathToFileURL(match).href, context);
    }
  }

  return nextResolve(specifier, context);
}
