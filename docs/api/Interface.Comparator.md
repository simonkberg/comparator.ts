[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / Comparator

# Interface: Comparator()\<T\>

Defined in:
[index.ts:25](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L25)

An interface for comparing two objects of type `T`.

## Extends

- [`CompareFn`](TypeAlias.CompareFn.md)\<`T`\>

## Type Parameters

| Type Parameter | Description                         |
| -------------- | ----------------------------------- |
| `T`            | The type of objects to be compared. |

```ts
Comparator(a, b): number;
```

Defined in:
[index.ts:17](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L17)

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

Defined in:
[index.ts:43](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L43)

Creates a comparator that reverses the order of this comparator.

#### Returns

`Comparator`\<`T`\>

A new Comparator that reverses the order of this comparator.

---

### thenComparing()

```ts
thenComparing(other): Comparator<T>;
```

Defined in:
[index.ts:35](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L35)

Creates a compound comparator that first uses this comparator and then uses
another comparator if the first comparison results in equality.

#### Parameters

| Parameter | Type                | Description                                                            |
| --------- | ------------------- | ---------------------------------------------------------------------- |
| `other`   | `Comparator`\<`T`\> | Another comparator to use if the first comparison results in equality. |

#### Returns

`Comparator`\<`T`\>

A new Comparator that combines this comparator and the provided comparator.
