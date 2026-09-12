[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / Comparator

# Interface: Comparator()\<T\>

Defined in: [index.ts:25](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L25)

A [CompareFn](TypeAlias.CompareFn.md) with methods for deriving new comparators from it.

## Extends

- [`CompareFn`](TypeAlias.CompareFn.md)\<`T`\>

## Type Parameters

| Type Parameter | Description                        |
| -------------- | ---------------------------------- |
| `T`            | The type of values to be compared. |

```ts
Comparator(a, b): number;
```

Defined in: [index.ts:17](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L17)

A [CompareFn](TypeAlias.CompareFn.md) with methods for deriving new comparators from it.

## Parameters

| Parameter | Type |
| --------- | ---- |
| `a`       | `T`  |
| `b`       | `T`  |

## Returns

`number`

## Methods

### nullishFirst()

```ts
nullishFirst(): Comparator<T | null | undefined>;
```

Defined in: [index.ts:108](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L108)

Creates a comparator that sorts `null` and `undefined` before all other
values and delegates the comparison of other values to this comparator.

`null` and `undefined` are considered equal to each other. Note that
`Array.prototype.sort` never passes `undefined` elements to a comparator
and always places them last; this method only affects `undefined` when it
appears inside a mapped value, for example through [comparing](Function.comparing.md).

#### Returns

`Comparator`\<`T` \| `null` \| `undefined`\>

A Comparator that handles `null` and `undefined` and
delegates other comparisons to this comparator.

#### Example

```ts
const cmp = numberComparator.nullishFirst();
console.log([3, null, 1].toSorted(cmp)); // [null, 1, 3]
```

---

### nullishLast()

```ts
nullishLast(): Comparator<T | null | undefined>;
```

Defined in: [index.ts:126](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L126)

Creates a comparator that sorts `null` and `undefined` after all other
values and delegates the comparison of other values to this comparator.

`null` and `undefined` are considered equal to each other.

#### Returns

`Comparator`\<`T` \| `null` \| `undefined`\>

A Comparator that handles `null` and `undefined` and
delegates other comparisons to this comparator.

#### Example

```ts
const cmp = numberComparator.nullishLast();
console.log([3, null, 1].toSorted(cmp)); // [1, 3, null]
```

---

### reversed()

```ts
reversed(): Comparator<T>;
```

Defined in: [index.ts:41](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L41)

Creates a comparator that imposes the reverse order of this comparator.

The result is cached, and reversing it again returns this comparator.

#### Returns

`Comparator`\<`T`\>

A Comparator that reverses the order of this comparator.

#### Example

```ts
const descending = numberComparator.reversed();
console.log([1, 3, 2].toSorted(descending)); // [3, 2, 1]
console.log(descending.reversed() === numberComparator); // true
```

---

### thenBy()

```ts
thenBy<U>(mapper, compareFn): Comparator<T>;
```

Defined in: [index.ts:87](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L87)

Creates a comparator that uses this comparator first and then breaks ties
by comparing the values returned by `mapper` with `compareFn`.

A result of `0`, `-0`, or `NaN` from this comparator counts as a tie.

#### Type Parameters

| Type Parameter | Description                    |
| -------------- | ------------------------------ |
| `U`            | The type of the mapped values. |

#### Parameters

| Parameter   | Type                                         | Description                                                      |
| ----------- | -------------------------------------------- | ---------------------------------------------------------------- |
| `mapper`    | (`value`) => `U`                             | A function that maps a value of type `T` to a value of type `U`. |
| `compareFn` | [`CompareFn`](TypeAlias.CompareFn.md)\<`U`\> | A function that compares two mapped values.                      |

#### Returns

`Comparator`\<`T`\>

A Comparator that combines this comparator and
`compareFn` applied to the mapped values.

#### Example

```ts
type Person = { name: string; nickname?: string };
const byNameThenNickname = comparing((person: Person) => person.name, stringComparator).thenBy(
  (person) => person.nickname,
  stringComparator.nullishLast(),
);
```

---

### thenWith()

```ts
thenWith(compareFn): Comparator<T>;
```

Defined in: [index.ts:62](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L62)

Creates a comparator that uses this comparator first and then breaks ties
with the provided compare function.

A result of `0`, `-0`, or `NaN` from this comparator counts as a tie.

#### Parameters

| Parameter   | Type                                         | Description                              |
| ----------- | -------------------------------------------- | ---------------------------------------- |
| `compareFn` | [`CompareFn`](TypeAlias.CompareFn.md)\<`T`\> | The compare function to break ties with. |

#### Returns

`Comparator`\<`T`\>

A Comparator that combines this comparator and
`compareFn`.

#### Example

```ts
type Person = { name: string; age: number };
const byAge = comparing((person: Person) => person.age, numberComparator);
const byName = comparing((person: Person) => person.name, stringComparator);
const byAgeThenName = byAge.thenWith(byName);
```
