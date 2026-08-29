import { defineConfig } from "oxfmt";

export default defineConfig({
  // Oxfmt defaults everywhere, except for import sorting, which replaces
  // `eslint-plugin-simple-import-sort`.
  sortImports: true,
  ignorePatterns: ["/dist", "pnpm-lock.yaml", "CHANGELOG.md"],
});
