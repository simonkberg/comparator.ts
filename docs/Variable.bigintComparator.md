[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / bigintComparator

# Variable: bigintComparator

```ts
const bigintComparator: Comparator<bigint>;
```

Defined in: [index.ts:270](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L270)

A [Comparator](Interface.Comparator.md) for comparing bigints in ascending order.

## Example

```ts
const result = bigintComparator(10n, 20n);
console.log(result); // Outputs a negative number because 10n is less than 20n.
```
