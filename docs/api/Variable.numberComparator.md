[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / numberComparator

# Variable: numberComparator

```ts
const numberComparator: Comparator<number>;
```

Defined in: [index.ts:143](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L143)

A [Comparator](Interface.Comparator.md) for comparing numbers in ascending order.

## Example

```ts
const result = numberComparator(10, 20);
console.log(result); // Outputs a negative number because 10 is less than 20.
```

## Returns

A [Comparator](Interface.Comparator.md) instance for comparing numbers.
