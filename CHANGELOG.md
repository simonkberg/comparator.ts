# comparator.ts

## 2.0.0

### Major Changes

- [#396](https://github.com/simonkberg/comparator.ts/pull/396) [`93ccd23`](https://github.com/simonkberg/comparator.ts/commit/93ccd23a0d5cf3f5cc92c4306f1747c36ae2494c) Thanks [@simonkberg](https://github.com/simonkberg)! - Drop support for Node.js 20 (EOL). Minimum supported version is now Node.js 22.

- [#634](https://github.com/simonkberg/comparator.ts/pull/634) [`66a05ba`](https://github.com/simonkberg/comparator.ts/commit/66a05bae5437123cd73eae28f9613101e68cefd3) Thanks [@simonkberg](https://github.com/simonkberg)! - Combinators are now methods on the comparator, and every built-in comparator now sorts deterministically, including `NaN`, invalid dates, and strings across locales.
  
  - Rename `thenComparing` to `thenWith`. It now accepts any compare function, not only a `Comparator`.
  - Add `thenBy(mapper, compareFn)` for breaking ties by a key without a nested `comparing` call.
  - Replace `nullsFirst(cmp)` and `nullsLast(cmp)` with the `cmp.nullishFirst()` and `cmp.nullishLast()` methods. Wrap a plain function with `comparator(fn)` first.
  - `numberComparator` and `dateComparator` are now total orders: `NaN` and invalid dates equal each other and sort last, instead of corrupting the sort.
  - `stringComparator` compares by UTF-16 code unit instead of `localeCompare`, so the order no longer depends on the runtime's locale. A locale-aware comparator follows in a later release.
  - Add `bigintComparator`.
  - `comparator(cmp)` returns `cmp` itself when it is already a `Comparator`, and `cmp.reversed().reversed()` is `cmp`.
  - `Comparator<T>` is now invariant in `T`. Where a `Comparator<Person>` was assigned to a `Comparator<Employee>`, use `comparator<Employee>(personComparator)`; passing it to `sort`, `thenWith`, or `comparing` is unchanged.

### Minor Changes

- [#635](https://github.com/simonkberg/comparator.ts/pull/635) [`e73923a`](https://github.com/simonkberg/comparator.ts/commit/e73923a4ada7cdcd186718e4ffbb7c88832447c0) Thanks [@simonkberg](https://github.com/simonkberg)! - Add `localeComparator(locales?, options?)`, a locale-aware string comparator backed by `Intl.Collator`. It replaces the locale-dependent behavior that `stringComparator` had in v1.

### Patch Changes

- [#635](https://github.com/simonkberg/comparator.ts/pull/635) [`e73923a`](https://github.com/simonkberg/comparator.ts/commit/e73923a4ada7cdcd186718e4ffbb7c88832447c0) Thanks [@simonkberg](https://github.com/simonkberg)! - Declare the package free of side effects so bundlers can drop it when unused.

## 1.0.4

### Patch Changes

- [#25](https://github.com/simonkberg/comparator.ts/pull/25) [`177ec20`](https://github.com/simonkberg/comparator.ts/commit/177ec208d15aa00831421b6e3f670d63ae6fe7e0) Thanks [@simonkberg](https://github.com/simonkberg)! - Minify bundles

## 1.0.3

### Patch Changes

- [#14](https://github.com/simonkberg/comparator.ts/pull/14) [`7a61d66`](https://github.com/simonkberg/comparator.ts/commit/7a61d66412f69b5071736b9003edd6bde5791347) Thanks [@simonkberg](https://github.com/simonkberg)! - Improve documentation and examples

## 1.0.2

### Patch Changes

- [#12](https://github.com/simonkberg/comparator.ts/pull/12) [`254a6cb`](https://github.com/simonkberg/comparator.ts/commit/254a6cbcf2fc09b1ef91221d4f944710c5d561d4) Thanks [@simonkberg](https://github.com/simonkberg)! - Fix repo URL and include README in package

## 1.0.1

### Patch Changes

- [#6](https://github.com/simonkberg/comparator.ts/pull/6) [`2a90b8c`](https://github.com/simonkberg/comparator.ts/commit/2a90b8c3fccd117f034b4fd990c079680530cacb) Thanks [@simonkberg](https://github.com/simonkberg)! - Initial release
