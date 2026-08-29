import { defineConfig } from "oxlint";

export default defineConfig({
  // Default plugins (`typescript`, `unicorn`, `oxc`) and the default
  // `correctness` category, plus type-aware linting via `oxlint-tsgolint`.
  categories: {
    correctness: "error",
  },
  options: {
    maxWarnings: 0,
    typeAware: true,
  },
  // These rules were enabled by `eslint:recommended` and
  // `typescript-eslint:recommended-type-checked`, but oxlint classifies them as
  // `suspicious`, `pedantic` or `restriction` rather than `correctness`. They
  // are listed explicitly so that dropping ESLint does not lose any of them.
  rules: {
    "eslint/no-array-constructor": "error",
    "eslint/no-case-declarations": "error",
    "eslint/no-empty": "error",
    "eslint/no-fallthrough": "error",
    "eslint/no-prototype-builtins": "error",
    "eslint/no-redeclare": "error",
    "eslint/no-regex-spaces": "error",
    "eslint/no-unexpected-multiline": "error",
    "eslint/preserve-caught-error": "error",
    "typescript/ban-ts-comment": "error",
    "typescript/no-empty-object-type": "error",
    "typescript/no-explicit-any": "error",
    "typescript/no-misused-promises": "error",
    "typescript/no-namespace": "error",
    "typescript/no-require-imports": "error",
    "typescript/no-unnecessary-type-assertion": "error",
    "typescript/no-unnecessary-type-constraint": "error",
    "typescript/no-unsafe-argument": "error",
    "typescript/no-unsafe-assignment": "error",
    "typescript/no-unsafe-call": "error",
    "typescript/no-unsafe-enum-comparison": "error",
    "typescript/no-unsafe-function-type": "error",
    "typescript/no-unsafe-member-access": "error",
    "typescript/no-unsafe-return": "error",
    "typescript/only-throw-error": "error",
    "typescript/prefer-promise-reject-errors": "error",
    "typescript/require-await": "error",
    "typescript/restrict-plus-operands": "error",
  },
});
