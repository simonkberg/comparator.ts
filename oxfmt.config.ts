import { defineConfig } from "oxfmt";

export default defineConfig({
  sortImports: true,
  ignorePatterns: ["/dist", "pnpm-lock.yaml", "CHANGELOG.md"],
});
