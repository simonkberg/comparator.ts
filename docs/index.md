**comparator.ts**

---

# comparator.ts

A TypeScript library for comparing values.

## Interfaces

| Interface                                 | Description                                                                                                                                                                                                |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Comparator](Interface.Comparator.md)     | A [CompareFn](TypeAlias.CompareFn.md) with methods for deriving new comparators from it.                                                                                                                   |
| [NaturalOrder](Interface.NaturalOrder.md) | The call signatures of [naturalOrder](Variable.naturalOrder.md). Each overload accepts one kind of [Comparable](TypeAlias.Comparable.md) so that values of different kinds cannot be compared by accident. |

## Type Aliases

| Type Alias                            | Description                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------ |
| [Comparable](TypeAlias.Comparable.md) | The kinds of values that [naturalOrder](Variable.naturalOrder.md) can compare. |
| [CompareFn](TypeAlias.CompareFn.md)   | A function that compares two values of type `T`.                               |

## Variables

| Variable                                           | Description                                                                                                                            |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [bigintComparator](Variable.bigintComparator.md)   | A [Comparator](Interface.Comparator.md) for comparing bigints in ascending order.                                                      |
| [booleanComparator](Variable.booleanComparator.md) | A [Comparator](Interface.Comparator.md) for comparing boolean values in ascending order, where `false` is considered less than `true`. |
| [dateComparator](Variable.dateComparator.md)       | A [Comparator](Interface.Comparator.md) for comparing `Date` objects in ascending order based on their time values.                    |
| [naturalOrder](Variable.naturalOrder.md)           | Compares two values of the same [Comparable](TypeAlias.Comparable.md) kind in their natural order.                                     |
| [numberComparator](Variable.numberComparator.md)   | A [Comparator](Interface.Comparator.md) for comparing numbers in ascending order.                                                      |
| [stringComparator](Variable.stringComparator.md)   | A [Comparator](Interface.Comparator.md) for comparing strings using locale-specific ordering.                                          |

## Functions

| Function                             | Description                                                                                                                                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [comparator](Function.comparator.md) | Creates a [Comparator](Interface.Comparator.md) from a compare function.                                                                                                                                                 |
| [comparing](Function.comparing.md)   | Creates a [Comparator](Interface.Comparator.md) that compares values of type `T` by mapping them to [Comparable](TypeAlias.Comparable.md) values and comparing those in their [natural order](Variable.naturalOrder.md). |
