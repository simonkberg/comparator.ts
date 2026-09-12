[**comparator.ts**](index.md)

---

[comparator.ts](index.md) / stringComparator

# Variable: stringComparator

```ts
const stringComparator: Comparator<string>;
```

Defined in: [index.ts:288](https://github.com/simonkberg/comparator.ts/blob/main/index.ts#L288)

A [Comparator](Interface.Comparator.md) for comparing strings by their UTF-16 code units, the
order of `<` on strings. Uppercase letters sort before lowercase letters.

The result does not depend on the runtime's locale.

## Example

```ts
const result = stringComparator("apple", "banana");
console.log(result); // Outputs a negative number because "apple" comes before "banana".
console.log(["b", "A", "a", "B"].toSorted(stringComparator)); // ["A", "B", "a", "b"]
```
