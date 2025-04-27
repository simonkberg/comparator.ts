**comparator.ts**

---

# comparator.ts

A TypeScript library for comparing values.

## Interfaces

| Interface                              | Description                                         |
| -------------------------------------- | --------------------------------------------------- |
| [Comparator](interfaces/Comparator.md) | An interface for comparing two objects of type `T`. |

## Type Aliases

| Type Alias                             | Description                                                 |
| -------------------------------------- | ----------------------------------------------------------- |
| [CompareFn](type-aliases/CompareFn.md) | A function interface for comparing two objects of type `T`. |

## Variables

| Variable                                            | Description                                                                                                          |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [booleanComparator](variables/booleanComparator.md) | A [Comparator](interfaces/Comparator.md) for comparing boolean values.                                               |
| [dateComparator](variables/dateComparator.md)       | A [Comparator](interfaces/Comparator.md) for comparing `Date` objects in ascending order based on their time values. |
| [numberComparator](variables/numberComparator.md)   | A [Comparator](interfaces/Comparator.md) for comparing numbers in ascending order.                                   |
| [stringComparator](variables/stringComparator.md)   | A [Comparator](interfaces/Comparator.md) for comparing strings using locale-specific ordering.                       |

## Functions

| Function                              | Description                                                                                                                                                                                                                        |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [comparator](functions/comparator.md) | Creates a [Comparator](interfaces/Comparator.md) from a custom comparison function.                                                                                                                                                |
| [comparing](functions/comparing.md)   | Creates a [Comparator](interfaces/Comparator.md) that compares objects of type `T` by mapping them to values of type `U` using a provided mapping function and then comparing the mapped values using a given comparison function. |
| [nullsFirst](functions/nullsFirst.md) | Creates a [Comparator](interfaces/Comparator.md) that considers `null` or `undefined` values as less than non-null values.                                                                                                         |
| [nullsLast](functions/nullsLast.md)   | Creates a [Comparator](interfaces/Comparator.md) that considers `null` or `undefined` values as greater than non-null values.                                                                                                      |
