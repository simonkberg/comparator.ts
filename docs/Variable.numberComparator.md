[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / numberComparator

# Variable: numberComparator

```ts
const numberComparator: Comparator<number>;
```

Defined in: [index.ts:251](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L251)

A [Comparator](Interface.Comparator.md) for comparing numbers in ascending order.

`-0` equals `0`. `NaN` equals `NaN` and sorts after every other number,
including `Infinity`.

## Example

```ts
const result = numberComparator(10, 20);
console.log(result); // Outputs a negative number because 10 is less than 20.
console.log([3, NaN, 1].toSorted(numberComparator)); // [1, 3, NaN]
```
