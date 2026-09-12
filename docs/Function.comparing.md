[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / comparing

# Function: comparing()

```ts
function comparing<T, U>(mapper, compareFn): Comparator<T>;
```

Defined in: [index.ts:232](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L232)

Creates a [Comparator](Interface.Comparator.md) that compares values of type `T` by mapping them
to values of type `U` and comparing those with `compareFn`.

TypeScript cannot infer `T` from a later `sort` call, so annotate the
parameter of `mapper` or the type of the result.

## Type Parameters

| Type Parameter | Description                        |
| -------------- | ---------------------------------- |
| `T`            | The type of values to be compared. |
| `U`            | The type of the mapped values.     |

## Parameters

| Parameter   | Type                                         | Description                                                      |
| ----------- | -------------------------------------------- | ---------------------------------------------------------------- |
| `mapper`    | (`value`) => `U`                             | A function that maps a value of type `T` to a value of type `U`. |
| `compareFn` | [`CompareFn`](TypeAlias.CompareFn.md)\<`U`\> | A function that compares two mapped values.                      |

## Returns

[`Comparator`](Interface.Comparator.md)\<`T`\>

A [Comparator](Interface.Comparator.md) for values of type `T` based on `compareFn`
applied to their mapped values.

## Example

```ts
type Person = { name: string; age: number };
const people: Person[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
];
const byAge = comparing((person: Person) => person.age, numberComparator);
console.log(people.toSorted(byAge)); // Bob, then Alice
```
