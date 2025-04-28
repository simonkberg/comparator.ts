**comparator.ts**

---

# comparator.ts

A TypeScript library for comparing values.

## Interfaces

| Interface                             | Description                                         |
| ------------------------------------- | --------------------------------------------------- |
| [Comparator](Interface.Comparator.md) | An interface for comparing two objects of type `T`. |

## Type Aliases

| Type Alias                          | Description                                                 |
| ----------------------------------- | ----------------------------------------------------------- |
| [CompareFn](TypeAlias.CompareFn.md) | A function interface for comparing two objects of type `T`. |

## Variables

| Variable                                           | Description                                                                                                                               |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [booleanComparator](Variable.booleanComparator.md) | \* A [Comparator](Interface.Comparator.md) for comparing boolean values in ascending order, where `false` is considered less than `true`. |
| [dateComparator](Variable.dateComparator.md)       | A [Comparator](Interface.Comparator.md) for comparing `Date` objects in ascending order based on their time values.                       |
| [numberComparator](Variable.numberComparator.md)   | A [Comparator](Interface.Comparator.md) for comparing numbers in ascending order.                                                         |
| [stringComparator](Variable.stringComparator.md)   | A [Comparator](Interface.Comparator.md) for comparing strings using locale-specific ordering.                                             |

## Functions

| Function                             | Description                                                                                                                                                                                                                       |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [comparator](Function.comparator.md) | Creates a [Comparator](Interface.Comparator.md) from a custom comparison function.                                                                                                                                                |
| [comparing](Function.comparing.md)   | Creates a [Comparator](Interface.Comparator.md) that compares objects of type `T` by mapping them to values of type `U` using a provided mapping function and then comparing the mapped values using a given comparison function. |
| [nullsFirst](Function.nullsFirst.md) | Creates a [Comparator](Interface.Comparator.md) that considers `null` or `undefined` values as less than non-null values.                                                                                                         |
| [nullsLast](Function.nullsLast.md)   | Creates a [Comparator](Interface.Comparator.md) that considers `null` or `undefined` values as greater than non-null values.                                                                                                      |
