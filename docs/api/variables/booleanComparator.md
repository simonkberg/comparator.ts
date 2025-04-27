[**comparator.ts**](../index.md)

---

[comparator.ts](../index.md) / booleanComparator

# Variable: booleanComparator

```ts
const booleanComparator: Comparator<boolean>;
```

Defined in: [index.ts:137](https://github.com/simonkberg/comparator.ts/blob/806cd3fa4519dbdc4b8bf35e9ef68a7f3c2522aa/index.ts#L137)

A [Comparator](../interfaces/Comparator.md) for comparing boolean values.

## Example

```ts
const result = booleanComparator(true, false);
console.log(result); // Outputs 1 because `true` is greater than `false`.
```

## Returns

A [Comparator](../interfaces/Comparator.md) instance for comparing boolean values.
