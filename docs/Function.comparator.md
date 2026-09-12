[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / comparator

# Function: comparator()

```ts
function comparator<T>(compareFn): Comparator<T>;
```

Defined in: [index.ts:201](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L201)

Creates a [Comparator](Interface.Comparator.md) from a compare function.

The compare function is wrapped, never modified. If `compareFn` is already
a [Comparator](Interface.Comparator.md), it is returned as is.

## Type Parameters

| Type Parameter | Description                        |
| -------------- | ---------------------------------- |
| `T`            | The type of values to be compared. |

## Parameters

| Parameter   | Type                                         | Description                                      |
| ----------- | -------------------------------------------- | ------------------------------------------------ |
| `compareFn` | [`CompareFn`](TypeAlias.CompareFn.md)\<`T`\> | A function that compares two values of type `T`. |

## Returns

[`Comparator`](Interface.Comparator.md)\<`T`\>

A [Comparator](Interface.Comparator.md) that uses the provided compare function.

## Example

```ts
const byLength = comparator<string>((a, b) => a.length - b.length);
console.log(["ccc", "a", "bb"].toSorted(byLength)); // ["a", "bb", "ccc"]
```
