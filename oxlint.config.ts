import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "error",
    suspicious: "error",
    pedantic: "error",
    restriction: "error",
  },
  options: {
    maxWarnings: 0,
    typeAware: true,
  },
  rules: {
    // `nullish` treats null and undefined as one case, so `== null` is intended.
    "eslint/eqeqeq": ["error", "always", { null: "ignore" }],
    "eslint/no-eq-null": "off",

    // Would add `readonly` to the parameters of the published `CompareFn` and `Comparator`.
    "typescript/prefer-readonly-parameter-types": "off",

    // Most of `index.ts` is the TSDoc that `docs/` is generated from; count code only.
    "eslint/max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
  },
  overrides: [
    {
      files: ["**/*.test.ts"],
      rules: {
        // The mutating `Array#sort` call is what these tests exercise.
        "unicorn/no-array-sort": "off",
        // Nullish handling is part of the API under test.
        "eslint/no-undefined": "off",
        "unicorn/no-useless-undefined": "off",
        // One test file per module.
        "eslint/max-lines": "off",
      },
    },
  ],
});
