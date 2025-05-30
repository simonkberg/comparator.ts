[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / comparing

# Function: comparing()

```ts
function comparing<T, U>(mapper, compareFn): Comparator<T>;
```

Defined in: [index.ts:124](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L124)

Creates a [Comparator](Interface.Comparator.md) that compares objects of type `T` by mapping them
to values of type `U` using a provided mapping function and then comparing
the mapped values using a given comparison function.

## Type Parameters

| Type Parameter | Description                                        |
| -------------- | -------------------------------------------------- |
| `T`            | The type of objects to be compared.                |
| `U`            | The type of the mapped values used for comparison. |

## Parameters

| Parameter   | Type                                         | Description                                                                                                                                                                                               |
| ----------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mapper`    | (`object`) => `U`                            | A function that maps an object of type `T` to a value of type `U`.                                                                                                                                        |
| `compareFn` | [`CompareFn`](TypeAlias.CompareFn.md)\<`U`\> | A function that compares two mapped values of type `U`. Should return a negative number if the first value is less than the second, zero if they are equal, or a positive number if the first is greater. |

## Returns

[`Comparator`](Interface.Comparator.md)\<`T`\>

A [Comparator](Interface.Comparator.md) for comparing objects of type `T` based on their
mapped values.

## Example

```ts
type Person = { name: string; age: number };
const people: Person[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
];
const ageComparator = comparing<Person, number>(
  (person) => person.age,
  numberComparator,
);
const sortedPeople = people.sort(ageComparator);
console.log(sortedPeople); // Outputs the array sorted by age in ascending order.
```
