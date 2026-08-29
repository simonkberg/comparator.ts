import { defineConfig } from "oxlint";

export default defineConfig({
  // Default plugins (`typescript`, `unicorn`, `oxc`), every category oxlint
  // considers a defect or a code smell, and type-aware linting via
  // `oxlint-tsgolint`. `perf` and `style` are the two categories left off.
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
    // `== null` is the intended idiom in `NullComparator`: it treats `null` and
    // `undefined` as one case, which is exactly what the nulls-first/nulls-last
    // comparators are specified to do. `no-eq-null` exists only to forbid that
    // idiom, so it goes off with it.
    "eslint/eqeqeq": ["error", "always", { null: "ignore" }],
    "eslint/no-eq-null": "off",

    // Would put `readonly` on the parameters of `CompareFn` and `Comparator`,
    // changing the published type surface. typescript-eslint keeps this out of
    // its `strict` preset for the same reason.
    "typescript/prefer-readonly-parameter-types": "off",
  },
  overrides: [
    {
      // These tests exist to prove the comparators work as `Array#sort`
      // arguments, so the mutating call is the thing under test.
      files: ["**/*.test.ts"],
      rules: {
        "unicorn/no-array-sort": "off",
      },
    },
  ],
});
