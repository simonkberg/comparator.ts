import { fileURLToPath, URL } from "node:url";

import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tsdoc from "eslint-plugin-tsdoc";
import ts from "typescript-eslint";

// import.meta.dirname is only available in Node v20+
const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default ts.config([
  { ignores: ["dist/*"] },
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  { files: ["**/*.js"], ...ts.configs.disableTypeChecked },
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  prettier,
  {
    files: ["**/*.ts"],
    plugins: { tsdoc: tsdoc },
    rules: { "tsdoc/syntax": "warn" },
  },
]);
