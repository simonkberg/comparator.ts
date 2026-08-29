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
    // `NullComparator` treats null and undefined as one case, so `== null` is intended.
    "eslint/eqeqeq": ["error", "always", { null: "ignore" }],
    "eslint/no-eq-null": "off",

    // Would add `readonly` to the parameters of the published `CompareFn` and `Comparator`.
    "typescript/prefer-readonly-parameter-types": "off",
  },
  overrides: [
    {
      // The mutating `Array#sort` call is what these tests exercise.
      files: ["**/*.test.ts"],
      rules: {
        "unicorn/no-array-sort": "off",
      },
    },
  ],
});
