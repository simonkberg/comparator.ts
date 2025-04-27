[**comparator.ts**](../index.md)

---

[comparator.ts](../index.md) / numberComparator

# Variable: numberComparator

```ts
const numberComparator: Comparator<number>;
```

Defined in: [index.ts:123](https://github.com/simonkberg/comparator.ts/blob/806cd3fa4519dbdc4b8bf35e9ef68a7f3c2522aa/index.ts#L123)

A [Comparator](../interfaces/Comparator.md) for comparing numbers in ascending order.

## Example

```ts
const result = numberComparator(10, 20);
console.log(result); // Outputs a negative number because 10 is less than 20.
```

## Returns

A [Comparator](../interfaces/Comparator.md) instance for comparing numbers.
