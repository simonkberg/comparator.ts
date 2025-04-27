[**comparator.ts**](../index.md)

---

[comparator.ts](../index.md) / Comparator

# Interface: Comparator()\<T\>

Defined in: [index.ts:24](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L24)

An interface for comparing two objects of type `T`.

## Extends

- [`CompareFn`](../type-aliases/CompareFn.md)\<`T`\>

## Type Parameters

| Type Parameter | Description                         |
| -------------- | ----------------------------------- |
| `T`            | The type of objects to be compared. |

```ts
Comparator(a, b): number;
```

Defined in: [index.ts:16](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L16)

An interface for comparing two objects of type `T`.

## Parameters

| Parameter | Type |
| --------- | ---- |
| `a`       | `T`  |
| `b`       | `T`  |

## Returns

`number`

## Methods

### reversed()

```ts
reversed(): Comparator<T>;
```

Defined in: [index.ts:39](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L39)

Creates a comparator that reverses the order of this comparator.

#### Returns

`Comparator`\<`T`\>

A new Comparator that reverses the order of this comparator.

---

### thenComparing()

```ts
thenComparing(other): Comparator<T>;
```

Defined in: [index.ts:32](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L32)

Creates a compound comparator that first uses this comparator and then uses another comparator
if the first comparison results in equality.

#### Parameters

| Parameter | Type                | Description                                                            |
| --------- | ------------------- | ---------------------------------------------------------------------- |
| `other`   | `Comparator`\<`T`\> | Another comparator to use if the first comparison results in equality. |

#### Returns

`Comparator`\<`T`\>

A new Comparator that combines this comparator and the provided comparator.
