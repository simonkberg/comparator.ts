[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / naturalOrder

# Variable: naturalOrder

```ts
const naturalOrder: NaturalOrder;
```

Defined in: [index.ts:201](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L201)

Compares two values of the same [Comparable](TypeAlias.Comparable.md) kind in their natural
order.

- `number` and `bigint` values compare numerically, and the two kinds may
  be mixed. `-0` equals `0`. `NaN` equals `NaN` and sorts after every other
  number, including `Infinity`.
- `string` values compare by UTF-16 code units, the order of `<` on strings.
- `boolean` values sort `false` before `true`.
- `Date` values compare by time value. Invalid dates equal each other and
  sort after every valid date.

Comparing values of different kinds is a type error, and the result at
runtime is unspecified.

## Example

```ts
console.log([10, 9, 1].toSorted(naturalOrder)); // [1, 9, 10]
console.log([10, 9, 1].toSorted()); // [1, 10, 9]
```

## Param

**a**

The first value to compare.

## Param

**b**

The second value to compare.

## Returns

A negative number if `a` sorts before `b`, zero if they are equal,
or a positive number if `a` sorts after `b`.
