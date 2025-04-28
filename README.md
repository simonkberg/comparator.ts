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
import {
  type Comparator,
  booleanComparator,
  comparing,
  nullsLast,
  stringComparator,
} from "comparator.ts";

type FeatureConfig = {
  enabled?: boolean;
  name: string;
};

const data: FeatureConfig[] = [
  { enabled: false, name: "Feature A" },
  { name: "Feature B" },
  { enabled: true, name: "Feature C" },
];

const compareByEnabled: Comparator<FeatureConfig> = comparing(
  (feature) => feature.enabled,
  nullsLast(booleanComparator.reversed()),
);

const compareByName: Comparator<FeatureConfig> = comparing(
  (feature) => feature.name,
  stringComparator,
);

const sortedData = data.toSorted(compareByEnabled.thenComparing(compareByName));
// sortedData = [
//   { enabled: true, name: "Feature C" },
//   { enabled: false, name: "Feature A" },
//   { name: "Feature B" },
// ]
```

## API

Full API documentation can be found [here](docs/index.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.
