[**comparator.ts**](../index.md)

---

[comparator.ts](../index.md) / comparator

# Function: comparator()

```ts
function comparator<T>(compareFn): Comparator<T>;
```

Defined in: [index.ts:52](https://github.com/simonkberg/comparator.ts/blob/806cd3fa4519dbdc4b8bf35e9ef68a7f3c2522aa/index.ts#L52)

Creates a [Comparator](../interfaces/Comparator.md) from a custom comparison function.

## Type Parameters

| Type Parameter | Description                         |
| -------------- | ----------------------------------- |
| `T`            | The type of objects to be compared. |

## Parameters

| Parameter   | Type                                               | Description                                                                                                                                                                                          |
| ----------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compareFn` | [`CompareFn`](../type-aliases/CompareFn.md)\<`T`\> | A function that compares two objects of type `T`. Should return a negative number if the first object is less than the second, zero if they are equal, or a positive number if the first is greater. |

## Returns

[`Comparator`](../interfaces/Comparator.md)\<`T`\>

A [Comparator](../interfaces/Comparator.md) that uses the provided comparison function.
