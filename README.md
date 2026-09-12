<h1 align="center">
  comparator.ts
</h1>
<p align="center">
  A TypeScript library for comparing values.
</p>

---

Comparators for `Array.prototype.sort` and `toSorted`, inspired by Java's `Comparator`. Every comparison names its comparator, so the order you get is the order you asked for.

## Installation

```sh
pnpm add comparator.ts
# or
# yarn add comparator.ts
# or
# npm install comparator.ts
```

## Usage

```ts
import { booleanComparator, comparing, stringComparator } from "comparator.ts";

type FeatureConfig = {
  enabled?: boolean;
  name: string;
};

const data: FeatureConfig[] = [
  { enabled: false, name: "Feature A" },
  { name: "Feature B" },
  { enabled: true, name: "Feature C" },
];

const compareByEnabled = comparing(
  (feature: FeatureConfig) => feature.enabled,
  booleanComparator.reversed().nullishLast(),
);

const sortedData = data.toSorted(
  compareByEnabled.thenBy((feature) => feature.name, stringComparator),
);
// sortedData = [
//   { enabled: true, name: "Feature C" },
//   { enabled: false, name: "Feature A" },
//   { name: "Feature B" },
// ]
```

A `Comparator` is a plain compare function with methods for deriving new comparators:

| Building a comparator                  | Deriving a comparator      |
| -------------------------------------- | -------------------------- |
| `comparator(fn)`                       | `cmp.reversed()`           |
| `comparing(mapper, cmp)`               | `cmp.thenWith(cmp2)`       |
| `numberComparator`                     | `cmp.thenBy(mapper, cmp2)` |
| `bigintComparator`                     | `cmp.nullishFirst()`       |
| `stringComparator`                     | `cmp.nullishLast()`        |
| `booleanComparator`                    |                            |
| `dateComparator`                       |                            |
| `localeComparator(locales?, options?)` |                            |

Every argument that takes a compare function accepts a plain `(a, b) => number` as well as a `Comparator`. A plain function becomes a `Comparator` with `comparator(fn)`.

## Ordering

Every built-in comparator, and everything derived from one, is a total order on its type: sorting gives the same result on every runtime and regardless of the input's starting order. Compare functions you write yourself must be consistent too; the library cannot repair one that is not.

- **Numbers and bigints** compare numerically. `-0` equals `0`. `NaN` equals `NaN` and sorts after every other number, including `Infinity`.
- **Strings** compare by UTF-16 code unit with `stringComparator`, the order of `<` on strings, so uppercase sorts before lowercase and the result never depends on the locale. Use `localeComparator(locales, options)` for text a person reads; it is equivalent to `localeCompare` with the same arguments and is slower. Called without arguments it returns one shared comparator.
- **Booleans** sort `false` before `true`.
- **Dates** compare by time value. Invalid dates equal each other and sort after every valid date.
- **Ties.** A result of `0`, `-0`, or `NaN` counts as a tie and hands off to the next comparator in `thenWith` and `thenBy`.
- **Nullish values.** `nullishFirst()` and `nullishLast()` treat `null` and `undefined` as one value, equal to each other, and never pass either to the wrapped comparator. `reversed()` reverses their placement too. Note that `Array.prototype.sort` and `toSorted` never pass bare `undefined` elements to any comparator and always place them last; nullish placement applies to `undefined` only inside a mapped value, as in the example above.
- **Identity.** `reversed()` is cached, and `cmp.reversed().reversed() === cmp`. `comparator(cmp)` returns `cmp` itself when it is already a `Comparator`. Every other method returns a new comparator on each call. The library never modifies a function it did not create.

## TypeScript

- TypeScript cannot infer the element type from a later `sort` call, so annotate the mapper parameter of the first `comparing` in a chain, as in `comparing((feature: FeatureConfig) => ...)`, or annotate the result as `Comparator<FeatureConfig>`. `thenBy` infers its mapper parameter from the receiver.
- A nullable key needs a nullish-aware comparator: `comparing((f: Feature) => f.enabled, booleanComparator.nullishLast())`.
- `Comparator<T>` is invariant in `T`. Passing a `Comparator<Person>` to `sort`, `thenWith`, or `comparing` for employees works, because those positions take a compare function. Only a variable or parameter annotated `Comparator<Employee>` rejects a `Comparator<Person>`; retype it with `comparator<Employee>(personComparator)`, which returns the same object. In your own APIs, accept `CompareFn<T>` and return `Comparator<T>`.

## Migrating from v1

| v1                                     | v2                                                                 |
| -------------------------------------- | ------------------------------------------------------------------ |
| `a.thenComparing(b)`                   | `a.thenWith(b)`, which also accepts a plain function               |
| `a.thenComparing(comparing(key, cmp))` | `a.thenBy(key, cmp)`                                               |
| `nullsLast(cmp)`, `nullsFirst(cmp)`    | `cmp.nullishLast()`, `cmp.nullishFirst()`                          |
| `stringComparator`                     | Now code-unit order. Use `localeComparator()` for the v1 behavior. |
| `numberComparator` with `NaN` present  | Now deterministic: `NaN` sorts last.                               |
| `const c: Comparator<Sub> = superCmp`  | `const c = comparator<Sub>(superCmp)`                              |

## API

Full API documentation can be found [here](docs/index.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.
