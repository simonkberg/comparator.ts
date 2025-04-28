[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / stringComparator

# Variable: stringComparator

```ts
const stringComparator: Comparator<string>;
```

Defined in: [index.ts:127](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L127)

A [Comparator](Interface.Comparator.md) for comparing strings using locale-specific ordering.

## Example

```ts
const result = stringComparator("apple", "banana");
console.log(result); // Outputs a negative number because "apple" comes before "banana".
```

## Returns

A [Comparator](Interface.Comparator.md) instance for comparing strings.
