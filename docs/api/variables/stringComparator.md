[**comparator.ts**](../index.md)

---

[comparator.ts](../index.md) / stringComparator

# Variable: stringComparator

```ts
const stringComparator: Comparator<string>;
```

Defined in: [index.ts:107](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L107)

A [Comparator](../interfaces/Comparator.md) for comparing strings using locale-specific ordering.

## Example

```ts
const result = stringComparator("apple", "banana");
console.log(result); // Outputs a negative number because "apple" comes before "banana".
```

## Returns

A [Comparator](../interfaces/Comparator.md) instance for comparing strings.
