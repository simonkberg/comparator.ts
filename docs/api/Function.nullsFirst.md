[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / nullsFirst

# Function: nullsFirst()

```ts
function nullsFirst<T>(compareFn): Comparator<undefined | null | T>;
```

Defined in: [index.ts:194](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L194)

Creates a [Comparator](Interface.Comparator.md) that considers `null` or `undefined` values as less than non-null values.

## Type Parameters

| Type Parameter | Description                         |
| -------------- | ----------------------------------- |
| `T`            | The type of objects to be compared. |

## Parameters

| Parameter   | Type                                         | Description                                                                                                                                                                                                 |
| ----------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compareFn` | [`CompareFn`](TypeAlias.CompareFn.md)\<`T`\> | A function that compares two non-null values of type `T`. Should return a negative number if the first value is less than the second, zero if they are equal, or a positive number if the first is greater. |

## Returns

[`Comparator`](Interface.Comparator.md)\<`undefined` \| `null` \| `T`\>

A [Comparator](Interface.Comparator.md) that treats `null` or `undefined` values as less than non-null values
and delegates non-null comparisons to the provided function.
