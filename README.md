<h1 align="center">
  comparator.ts
</h1>
<p align="center">
  A TypeScript library for comparing values.
</p>

---

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

A `Comparator` is a compare function with methods for deriving new comparators.

Build one with `comparator(fn)`, `comparing(mapper, cmp)`, or a built-in: `numberComparator`, `bigintComparator`, `stringComparator`, `booleanComparator`, `dateComparator`, `localeComparator(locales?, options?)`.

Derive one with `cmp.reversed()`, `cmp.thenWith(cmp2)`, `cmp.thenBy(mapper, cmp2)`, `cmp.nullishFirst()`, or `cmp.nullishLast()`.

Wherever a compare function is expected, a plain `(a, b) => number` works too.

## Ordering

All built-in comparators are total orders: sorting gives the same result on every runtime, regardless of input order.

- Numbers and bigints compare numerically. `-0` equals `0`. `NaN` equals `NaN` and sorts last.
- `stringComparator` compares by UTF-16 code unit, so uppercase sorts before lowercase. `localeComparator(locales?, options?)` behaves like `localeCompare` with the same arguments; use it for text people read.
- Booleans sort `false` before `true`.
- Dates compare by time value. Invalid dates equal each other and sort last.
- A result of `0`, `-0`, or `NaN` is a tie and falls through to the next comparator in `thenWith` and `thenBy`.
- `nullishFirst()` and `nullishLast()` treat `null` and `undefined` as one value. `reversed()` reverses their placement too. `Array.prototype.sort` never passes `undefined` elements to a comparator and always places them last, so nullish placement only applies inside a mapped value, as in the example above.
- `reversed()` is cached, and `cmp.reversed().reversed() === cmp`. `comparator(cmp)` returns `cmp` if it already is a `Comparator`. Other methods return a new comparator each call.

## TypeScript

- Annotate the mapper parameter of the first `comparing` in a chain, as in the example. TypeScript cannot infer it from a later `sort` call. `thenBy` infers its mapper parameter from the receiver.
- `Comparator<T>` is invariant in `T`. Passing a `Comparator<Person>` where a compare function for `Employee` is expected works. Assigning it to a variable typed `Comparator<Employee>` does not; use `comparator<Employee>(personComparator)`.

## Migrating from v1

| v1                                     | v2                                                             |
| -------------------------------------- | -------------------------------------------------------------- |
| `a.thenComparing(b)`                   | `a.thenWith(b)`                                                |
| `a.thenComparing(comparing(key, cmp))` | `a.thenBy(key, cmp)`                                           |
| `nullsLast(cmp)`, `nullsFirst(cmp)`    | `cmp.nullishLast()`, `cmp.nullishFirst()`                      |
| `stringComparator`                     | Now code-unit order. `localeComparator()` is the old behavior. |
| `numberComparator` with `NaN`          | `NaN` now sorts last.                                          |

## API

Full API documentation can be found [here](docs/index.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.
