[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / CompareFn

# Type Alias: CompareFn\<T\>

```ts
type CompareFn<T> = (a, b) => number;
```

Defined in: [index.ts:17](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L17)

A function that compares two values of type `T`.

## Type Parameters

| Type Parameter | Description                        |
| -------------- | ---------------------------------- |
| `T`            | The type of values to be compared. |

## Parameters

| Parameter | Type | Description                  |
| --------- | ---- | ---------------------------- |
| `a`       | `T`  | The first value to compare.  |
| `b`       | `T`  | The second value to compare. |

## Returns

`number`

A negative number if `a` sorts before `b`, zero if they are equal,
or a positive number if `a` sorts after `b`.
