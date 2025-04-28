[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / comparator

# Function: comparator()

```ts
function comparator<T>(compareFn): Comparator<T>;
```

Defined in: [index.ts:59](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L59)

Creates a [Comparator](Interface.Comparator.md) from a custom comparison function.

## Type Parameters

| Type Parameter | Description                         |
| -------------- | ----------------------------------- |
| `T`            | The type of objects to be compared. |

## Parameters

| Parameter   | Type                                         | Description                                                                                                                                                                                          |
| ----------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compareFn` | [`CompareFn`](TypeAlias.CompareFn.md)\<`T`\> | A function that compares two objects of type `T`. Should return a negative number if the first object is less than the second, zero if they are equal, or a positive number if the first is greater. |

## Returns

[`Comparator`](Interface.Comparator.md)\<`T`\>

A [Comparator](Interface.Comparator.md) that uses the provided comparison function.

## Example

```ts
const lengthComparator = comparator<string>((a, b) => a.length - b.length);
const result = lengthComparator("apple", "banana");
console.log(result); // Outputs a negative number because "apple" is shorter than "banana".
```
