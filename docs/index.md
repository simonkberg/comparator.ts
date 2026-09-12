**comparator.ts**

---

# comparator.ts

A TypeScript library for comparing values.

## Interfaces

| Interface                             | Description                                                                              |
| ------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Comparator](Interface.Comparator.md) | A [CompareFn](TypeAlias.CompareFn.md) with methods for deriving new comparators from it. |

## Type Aliases

| Type Alias                          | Description                                      |
| ----------------------------------- | ------------------------------------------------ |
| [CompareFn](TypeAlias.CompareFn.md) | A function that compares two values of type `T`. |

## Variables

| Variable                                           | Description                                                                                                                                                             |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bigintComparator](Variable.bigintComparator.md)   | A [Comparator](Interface.Comparator.md) for comparing bigints in ascending order.                                                                                       |
| [booleanComparator](Variable.booleanComparator.md) | A [Comparator](Interface.Comparator.md) for comparing boolean values in ascending order, where `false` is considered less than `true`.                                  |
| [dateComparator](Variable.dateComparator.md)       | A [Comparator](Interface.Comparator.md) for comparing `Date` objects in ascending order based on their time values.                                                     |
| [numberComparator](Variable.numberComparator.md)   | A [Comparator](Interface.Comparator.md) for comparing numbers in ascending order.                                                                                       |
| [stringComparator](Variable.stringComparator.md)   | A [Comparator](Interface.Comparator.md) for comparing strings by their UTF-16 code units, the order of `<` on strings. Uppercase letters sort before lowercase letters. |

## Functions

| Function                             | Description                                                                                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [comparator](Function.comparator.md) | Creates a [Comparator](Interface.Comparator.md) from a compare function.                                                                                     |
| [comparing](Function.comparing.md)   | Creates a [Comparator](Interface.Comparator.md) that compares values of type `T` by mapping them to values of type `U` and comparing those with `compareFn`. |
