[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / dateComparator

# Variable: dateComparator

```ts
const dateComparator: Comparator<Date>;
```

Defined in: [index.ts:173](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L173)

A [Comparator](Interface.Comparator.md) for comparing `Date` objects in ascending order based on their time values.

## Example

```ts
const result = dateComparator(new Date(2023, 0, 1), new Date(2023, 0, 2));
console.log(result); // Outputs a negative number because the first date is earlier than the second.
```

## Returns

A [Comparator](Interface.Comparator.md) instance for comparing `Date` objects.
