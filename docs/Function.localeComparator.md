[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / localeComparator

# Function: localeComparator()

```ts
function localeComparator(locales?, options?): Comparator<string>;
```

Defined in: [index.ts:349](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L349)

Creates a [Comparator](Interface.Comparator.md) for comparing strings using locale-aware
ordering, backed by `Intl.Collator`.

The order depends on the locale and on the runtime's locale data, and
collation is slower than [stringComparator](Variable.stringComparator.md). Use it for text a person
reads, and [stringComparator](Variable.stringComparator.md) where the order must be the same
everywhere.

## Parameters

| Parameter  | Type              | Description                                                                    |
| ---------- | ----------------- | ------------------------------------------------------------------------------ |
| `locales?` | `LocalesArgument` | The locale or locales to collate by. Defaults to the runtime's default locale. |
| `options?` | `CollatorOptions` | Collation options such as `numeric` or `sensitivity`.                          |

## Returns

[`Comparator`](Interface.Comparator.md)\<`string`\>

A [Comparator](Interface.Comparator.md) that compares strings with the collator.

## Example

```ts
console.log(["b", "A", "a", "B"].toSorted(localeComparator("en"))); // ["a", "A", "b", "B"]
console.log(["a10", "a9"].toSorted(localeComparator("en", { numeric: true }))); // ["a9", "a10"]
```
