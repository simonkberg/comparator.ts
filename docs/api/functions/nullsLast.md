[**comparator.ts**](../index.md)

---

[comparator.ts](../index.md) / nullsLast

# Function: nullsLast()

```ts
function nullsLast<T>(compareFn): Comparator<undefined | null | T>;
```

Defined in: [index.ts:208](https://github.com/simonkberg/comparator.ts/blob/806cd3fa4519dbdc4b8bf35e9ef68a7f3c2522aa/index.ts#L208)

Creates a [Comparator](../interfaces/Comparator.md) that considers `null` or `undefined` values as greater than non-null values.

## Type Parameters

| Type Parameter | Description                         |
| -------------- | ----------------------------------- |
| `T`            | The type of objects to be compared. |

## Parameters

| Parameter   | Type                                               | Description                                                                                                                                                                                                 |
| ----------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compareFn` | [`CompareFn`](../type-aliases/CompareFn.md)\<`T`\> | A function that compares two non-null values of type `T`. Should return a negative number if the first value is less than the second, zero if they are equal, or a positive number if the first is greater. |

## Returns

[`Comparator`](../interfaces/Comparator.md)\<`undefined` \| `null` \| `T`\>

A [Comparator](../interfaces/Comparator.md) that treats `null` or `undefined` values as greater than non-null values
and delegates non-null comparisons to the provided function.
