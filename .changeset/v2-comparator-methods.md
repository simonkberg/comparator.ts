---
"comparator.ts": major
---

Rework the `Comparator` API around methods and a natural order.

- Add `naturalOrder`, a total order for `number`, `bigint`, `string`, `boolean`, and `Date` values, with the `Comparable` type for the kinds it accepts. `NaN` and invalid dates sort last instead of corrupting the sort.
- `comparing(mapper)` now defaults to `naturalOrder` for `Comparable` keys; the second argument is optional.
- Rename `thenComparing` to `thenWith`. It now accepts any compare function, not only a `Comparator`.
- Add `thenBy(mapper, compareFn?)` for breaking ties by a key without a nested `comparing` call.
- Replace `nullsFirst(cmp)` and `nullsLast(cmp)` with the `cmp.nullishFirst()` and `cmp.nullishLast()` methods. Wrap a plain function with `comparator(fn)` first.
- Add `bigintComparator`.
- `comparator(cmp)` returns `cmp` itself when it is already a `Comparator`, and `cmp.reversed().reversed()` is `cmp`.
- `Comparator<T>` is now invariant in `T`. Where a `Comparator<Person>` was assigned to a `Comparator<Employee>`, use `comparator<Employee>(personComparator)`; passing it to `sort`, `thenWith`, or `comparing` is unchanged.
