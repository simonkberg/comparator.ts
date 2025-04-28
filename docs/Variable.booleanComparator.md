[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / booleanComparator

# Variable: booleanComparator

```ts
const booleanComparator: Comparator<boolean>;
```

Defined in: [index.ts:175](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L175)

A [Comparator](Interface.Comparator.md) for comparing boolean values in ascending order, where
`false` is considered less than `true`.

## Example

```ts
const result = booleanComparator(false, true);
console.log(result); // Outputs a negative number because `false` is less than `true`.
```

## Returns

A [Comparator](Interface.Comparator.md) instance for comparing boolean values.
