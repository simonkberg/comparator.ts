---
"comparator.ts": major
---

Rework the `Comparator` API around methods and make every built-in comparator a total order.

- Rename `thenComparing` to `thenWith`. It now accepts any compare function, not only a `Comparator`.
- Add `thenBy(mapper, compareFn)` for breaking ties by a key without a nested `comparing` call.
- Replace `nullsFirst(cmp)` and `nullsLast(cmp)` with the `cmp.nullishFirst()` and `cmp.nullishLast()` methods. Wrap a plain function with `comparator(fn)` first.
- `numberComparator` and `dateComparator` are now total orders: `NaN` and invalid dates equal each other and sort last, instead of corrupting the sort.
- `stringComparator` compares by UTF-16 code unit instead of `localeCompare`, so the order no longer depends on the runtime's locale. A locale-aware comparator follows in a later release.
- Add `bigintComparator`.
- `comparator(cmp)` returns `cmp` itself when it is already a `Comparator`, and `cmp.reversed().reversed()` is `cmp`.
- `Comparator<T>` is now invariant in `T`. Where a `Comparator<Person>` was assigned to a `Comparator<Employee>`, use `comparator<Employee>(personComparator)`; passing it to `sort`, `thenWith`, or `comparing` is unchanged.
