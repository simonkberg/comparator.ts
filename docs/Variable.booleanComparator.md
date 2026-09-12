[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / booleanComparator

# Variable: booleanComparator

```ts
const booleanComparator: Comparator<boolean>;
```

Defined in: [index.ts:416](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L416)

A [Comparator](Interface.Comparator.md) for comparing boolean values in ascending order, where
`false` is considered less than `true`.

## Example

```ts
const result = booleanComparator(false, true);
console.log(result); // Outputs a negative number because `false` is less than `true`.
```
