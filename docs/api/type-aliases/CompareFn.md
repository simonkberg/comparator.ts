[**comparator.ts**](../index.md)

---

[comparator.ts](../index.md) / CompareFn

# Type Alias: CompareFn()\<T\>

```ts
type CompareFn<T> = (a, b) => number;
```

Defined in: [index.ts:16](https://github.com/simonkberg/comparator.ts/blob/806cd3fa4519dbdc4b8bf35e9ef68a7f3c2522aa/index.ts#L16)

A function interface for comparing two objects of type `T`.

## Type Parameters

| Type Parameter | Description                         |
| -------------- | ----------------------------------- |
| `T`            | The type of objects to be compared. |

## Parameters

| Parameter | Type | Description                   |
| --------- | ---- | ----------------------------- |
| `a`       | `T`  | The first object to compare.  |
| `b`       | `T`  | The second object to compare. |

## Returns

`number`

A negative number if `a` is less than `b`, zero if they are equal, or a positive number if `a` is greater than `b`.
