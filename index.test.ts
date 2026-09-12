/// <reference lib="es2023" />

/* oxlint-disable typescript/no-floating-promises */
import assert from "node:assert/strict";
import { describe, it, test } from "node:test";

import fc from "fast-check";

import {
  bigintComparator,
  booleanComparator,
  type CompareFn,
  type Comparator,
  comparator,
  comparing,
  dateComparator,
  localeComparator,
  numberComparator,
  stringComparator,
} from "./index.ts";

const subtract = (a: number, b: number): number => a - b;
const constant = (result: number): Comparator<number> => comparator(() => result);

describe("comparator", () => {
  it("should create a comparator from a function", () => {
    const cmp: Comparator<number> = comparator((a, b) => a - b);
    assert.ok(cmp(1, 2) < 0);
    assert.ok(cmp(2, 1) > 0);
    assert.ok(cmp(1, 1) === 0);
  });

  it("should not modify the function it is given", () => {
    const cmp = comparator(subtract);
    assert.notStrictEqual(cmp, subtract);
    assert.ok(!("reversed" in subtract));
  });

  it("should return a comparator as is", () => {
    const cmp = comparator((a: number, b: number) => a - b);
    assert.strictEqual(comparator(cmp), cmp);
    assert.strictEqual(comparator(numberComparator), numberComparator);
  });

  it("should be possible to pass compare method to sort method", () => {
    const cmp = comparator<number>((a, b) => a - b);
    assert.deepEqual([3, 1, 2].sort(cmp), [1, 2, 3]);
  });
});

describe("reversed", () => {
  it("should reverse the order of comparison", () => {
    const reverseCmp = numberComparator.reversed();
    assert.ok(reverseCmp(1, 2) > 0);
    assert.ok(reverseCmp(2, 1) < 0);
    assert.ok(reverseCmp(1, 1) === 0);
    assert.deepEqual([1, 3, 2].toSorted(reverseCmp), [3, 2, 1]);
  });

  it("should cache the reversed comparator", () => {
    const cmp = comparator<number>((a, b) => a - b);
    assert.strictEqual(cmp.reversed(), cmp.reversed());
  });

  it("should return the original comparator when reversed twice", () => {
    const cmp = comparator<number>((a, b) => a - b);
    assert.strictEqual(cmp.reversed().reversed(), cmp);
  });

  it("should reverse the placement of nullish values", () => {
    const cmp = numberComparator.nullishLast().reversed();
    assert.deepEqual([1, null, 2].toSorted(cmp), [null, 2, 1]);
  });
});

describe("thenWith", () => {
  type TestObject = { num: number; str: string };
  const obj1a = { num: 1, str: "a" };
  const obj1b = { num: 1, str: "b" };
  const obj2b = { num: 2, str: "b" };

  it("should break ties with a comparator", () => {
    const byNum = comparing((obj: TestObject) => obj.num, numberComparator);
    const byStr = comparing((obj: TestObject) => obj.str, stringComparator);
    const cmp = byNum.thenWith(byStr);
    assert.ok(cmp(obj1a, obj2b) < 0);
    assert.ok(cmp(obj1a, obj1b) < 0);
    assert.ok(cmp(obj1a, obj1a) === 0);
    assert.ok(cmp(obj2b, obj1a) > 0);
  });

  it("should break ties with a plain compare function", () => {
    const cmp = comparing((obj: TestObject) => obj.num, numberComparator).thenWith((a, b) =>
      b.str.localeCompare(a.str),
    );
    assert.deepEqual([obj1a, obj2b, obj1b].toSorted(cmp), [obj1b, obj1a, obj2b]);
  });

  it("should treat -0 and NaN results as ties", () => {
    assert.ok(constant(-0).thenWith(numberComparator)(1, 2) < 0);
    assert.ok(constant(Number.NaN).thenWith(numberComparator)(1, 2) < 0);
    assert.ok(constant(1).thenWith(numberComparator)(1, 2) > 0);
  });

  it("should chain more than two comparators", () => {
    type Triple = { a: number; b: number; c: number };
    const cmp = comparing((t: Triple) => t.a, numberComparator)
      .thenWith(comparing((t: Triple) => t.b, numberComparator))
      .thenWith(comparing((t: Triple) => t.c, numberComparator));
    const sorted = [
      { a: 1, b: 2, c: 2 },
      { a: 1, b: 2, c: 1 },
      { a: 1, b: 1, c: 3 },
      { a: 0, b: 9, c: 9 },
    ].toSorted(cmp);
    assert.deepEqual(sorted, [
      { a: 0, b: 9, c: 9 },
      { a: 1, b: 1, c: 3 },
      { a: 1, b: 2, c: 1 },
      { a: 1, b: 2, c: 2 },
    ]);
  });
});

describe("thenBy", () => {
  type Person = { name: string; age: number; nickname?: string };
  const alice = { name: "Alice", age: 30 };
  const bob = { name: "Bob", age: 30, nickname: "Bobby" };
  const carol = { name: "Carol", age: 25 };

  it("should break ties by the mapped values", () => {
    const cmp = comparing((person: Person) => person.age, numberComparator).thenBy(
      (person) => person.name,
      stringComparator,
    );
    assert.deepEqual([bob, alice, carol].toSorted(cmp), [carol, alice, bob]);
  });

  it("should break ties by nullable mapped values", () => {
    const cmp = comparing((person: Person) => person.age, numberComparator).thenBy(
      (person) => person.nickname,
      stringComparator.nullishLast(),
    );
    assert.deepEqual([alice, bob, carol].toSorted(cmp), [carol, bob, alice]);
  });

  it("should chain more than two keys", () => {
    type Triple = { a: number; b: string; c: boolean };
    const cmp = comparing((t: Triple) => t.a, numberComparator)
      .thenBy((t) => t.b, stringComparator)
      .thenBy((t) => t.c, booleanComparator);
    const sorted = [
      { a: 1, b: "x", c: true },
      { a: 1, b: "x", c: false },
      { a: 1, b: "w", c: true },
      { a: 0, b: "z", c: true },
    ].toSorted(cmp);
    assert.deepEqual(sorted, [
      { a: 0, b: "z", c: true },
      { a: 1, b: "w", c: true },
      { a: 1, b: "x", c: false },
      { a: 1, b: "x", c: true },
    ]);
  });
});

describe("nullishFirst", () => {
  it("should sort null before other values", () => {
    const cmp = numberComparator.nullishFirst();
    assert.ok(cmp(null, 1) < 0);
    assert.ok(cmp(1, null) > 0);
    assert.ok(cmp(null, null) === 0);
    assert.deepEqual([3, null, 2].toSorted(cmp), [null, 2, 3]);
  });

  it("should treat null and undefined as equal", () => {
    const cmp = numberComparator.nullishFirst();
    assert.ok(cmp(null, undefined) === 0);
    assert.ok(cmp(undefined, null) === 0);
  });

  it("should sort undefined mapped values first", () => {
    const cmp = comparing((obj: { n?: number }) => obj.n, numberComparator.nullishFirst());
    assert.deepEqual([{ n: 3 }, {}, { n: 1 }].toSorted(cmp), [{}, { n: 1 }, { n: 3 }]);
  });

  it("cannot move undefined elements, which sort always places last", () => {
    const cmp = numberComparator.nullishFirst();
    assert.deepEqual([3, undefined, 1].toSorted(cmp), [1, 3, undefined]);
  });
});

describe("nullishLast", () => {
  it("should sort null after other values", () => {
    const cmp = numberComparator.nullishLast();
    assert.ok(cmp(1, null) < 0);
    assert.ok(cmp(null, 1) > 0);
    assert.ok(cmp(null, null) === 0);
    assert.deepEqual([3, null, 2].toSorted(cmp), [2, 3, null]);
  });

  it("should sort undefined mapped values last", () => {
    const cmp = comparing((obj: { n?: number }) => obj.n, numberComparator.nullishLast());
    assert.deepEqual([{ n: 3 }, {}, { n: 1 }].toSorted(cmp), [{ n: 1 }, { n: 3 }, {}]);
  });
});

describe("comparing", () => {
  type TestObject = { num: number };
  const obj1 = { num: 1 };
  const obj2 = { num: 2 };
  const obj3 = { num: 3 };

  it("should compare the mapped values using a comparator", () => {
    const cmp = comparing((obj: TestObject) => obj.num, numberComparator);
    assert.ok(cmp(obj1, obj2) < 0);
    assert.ok(cmp(obj2, obj1) > 0);
    assert.ok(cmp(obj1, obj1) === 0);
    assert.deepEqual([obj3, obj1, obj2].toSorted(cmp), [obj1, obj2, obj3]);
  });

  it("should accept a plain compare function", () => {
    const cmp = comparing(
      (obj: TestObject) => obj.num,
      (a, b) => b - a,
    );
    assert.deepEqual([obj3, obj1, obj2].toSorted(cmp), [obj3, obj2, obj1]);
  });

  it("should infer the value type from an annotated result", () => {
    const cmp: Comparator<TestObject> = comparing((obj) => obj.num, numberComparator);
    assert.deepEqual([obj3, obj1, obj2].toSorted(cmp), [obj1, obj2, obj3]);
  });
});

describe("stringComparator", () => {
  it("should be a string comparator", () => {
    assert.ok(stringComparator("a", "b") < 0);
    assert.ok(stringComparator("b", "a") > 0);
    assert.ok(stringComparator("a", "a") === 0);
  });

  it("should compare by code unit, independent of locale", () => {
    assert.deepEqual(["b", "A", "a", "B"].toSorted(stringComparator), ["A", "B", "a", "b"]);
  });

  it("should be possible to pass compare method to sort method", () => {
    assert.deepEqual(["c", "a", "b"].sort(stringComparator), ["a", "b", "c"]);
  });
});

describe("localeComparator", () => {
  it("should compare strings by locale", () => {
    const cmp = localeComparator("en");
    assert.ok(cmp("a", "b") < 0);
    assert.ok(cmp("b", "a") > 0);
    assert.ok(cmp("a", "a") === 0);
    assert.deepEqual(["b", "A", "a", "B"].toSorted(cmp), ["a", "A", "b", "B"]);
  });

  it("should pass collator options through", () => {
    assert.deepEqual(["a10", "a9"].toSorted(localeComparator("en", { numeric: true })), [
      "a9",
      "a10",
    ]);
    assert.ok(localeComparator("en", { sensitivity: "base" })("a", "A") === 0);
  });

  it("should be a comparator", () => {
    assert.deepEqual(["a", "b"].toSorted(localeComparator("en").reversed()), ["b", "a"]);
  });
});

describe("numberComparator", () => {
  it("should be a number comparator", () => {
    assert.ok(numberComparator(1, 2) < 0);
    assert.ok(numberComparator(2, 1) > 0);
    assert.ok(numberComparator(1, 1) === 0);
    assert.ok(numberComparator(-0, 0) === 0);
    assert.ok(numberComparator(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY) === 0);
    assert.ok(numberComparator(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY) < 0);
  });

  it("should sort NaN after every other number", () => {
    assert.ok(numberComparator(Number.NaN, Number.POSITIVE_INFINITY) > 0);
    assert.ok(numberComparator(Number.POSITIVE_INFINITY, Number.NaN) < 0);
    assert.ok(numberComparator(Number.NaN, Number.NaN) === 0);
    assert.deepEqual([3, Number.NaN, 1, 2].toSorted(numberComparator), [1, 2, 3, Number.NaN]);
    assert.deepEqual([Number.NaN, 3, 1, 2].toSorted(numberComparator), [1, 2, 3, Number.NaN]);
  });

  it("should be possible to pass compare method to sort method", () => {
    assert.deepEqual([3, 1, 2].sort(numberComparator), [1, 2, 3]);
  });
});

describe("bigintComparator", () => {
  it("should be a bigint comparator", () => {
    assert.ok(bigintComparator(1n, 2n) < 0);
    assert.ok(bigintComparator(2n, 1n) > 0);
    assert.ok(bigintComparator(1n, 1n) === 0);
  });

  it("should be possible to pass compare method to sort method", () => {
    assert.deepEqual([3n, 1n, 2n].sort(bigintComparator), [1n, 2n, 3n]);
  });
});

describe("booleanComparator", () => {
  it("should create a boolean comparator", () => {
    assert.ok(booleanComparator(true, false) > 0);
    assert.ok(booleanComparator(false, true) < 0);
    assert.ok(booleanComparator(true, true) === 0);
    assert.ok(booleanComparator(false, false) === 0);
  });

  it("should be possible to pass compare method to sort method", () => {
    assert.deepEqual([true, false, true].sort(booleanComparator), [false, true, true]);
  });
});

describe("dateComparator", () => {
  it("should create a date comparator", () => {
    const date1 = new Date("2023-01-01");
    const date2 = new Date("2023-01-02");
    const date3 = new Date("2023-01-01");
    assert.ok(dateComparator(date1, date2) < 0);
    assert.ok(dateComparator(date2, date1) > 0);
    assert.ok(dateComparator(date1, date3) === 0);
  });

  it("should be possible to pass compare method to sort method", () => {
    const date1 = new Date("2023-01-01");
    const date2 = new Date("2023-01-02");
    const date3 = new Date("2023-01-03");
    assert.deepEqual([date2, date1, date3].sort(dateComparator), [date1, date2, date3]);
  });

  it("should sort invalid dates after every valid date", () => {
    const invalid = new Date("invalid");
    assert.ok(dateComparator(invalid, new Date(0)) > 0);
    assert.ok(dateComparator(new Date(0), invalid) < 0);
    assert.ok(dateComparator(invalid, new Date("also invalid")) === 0);
  });
});

/**
 * Checks that `compareFn` is a total order over values from `arbitrary`:
 * reflexive, antisymmetric, transitive, and independent of input order.
 */
const assertTotalOrder = <T>(arbitrary: fc.Arbitrary<T>, compareFn: CompareFn<T>): void => {
  fc.assert(
    fc.property(arbitrary, arbitrary, (a, b) => {
      assert.ok(compareFn(a, a) === 0);
      assert.ok(Math.sign(compareFn(a, b)) + Math.sign(compareFn(b, a)) === 0);
    }),
  );
  fc.assert(
    fc.property(arbitrary, arbitrary, arbitrary, (a, b, c) => {
      if (compareFn(a, b) <= 0 && compareFn(b, c) <= 0) {
        assert.ok(compareFn(a, c) <= 0);
      }
    }),
  );
  fc.assert(
    fc.property(fc.array(arbitrary), (values) => {
      const sorted = values.toSorted(compareFn);
      const sortedFromReversed = values.toReversed().toSorted(compareFn);
      assert.equal(sortedFromReversed.length, sorted.length);
      for (const [i, value] of sorted.entries()) {
        const other = sortedFromReversed[i];
        assert.ok(other !== undefined && compareFn(value, other) === 0);
      }
    }),
  );
};

describe("total order laws", () => {
  it("hold for numberComparator", () => {
    assertTotalOrder(fc.double(), numberComparator);
  });

  it("hold for bigintComparator", () => {
    assertTotalOrder(fc.bigInt(), bigintComparator);
  });

  it("hold for stringComparator", () => {
    assertTotalOrder(fc.string(), stringComparator);
  });

  it("hold for localeComparator", () => {
    assertTotalOrder(fc.string(), localeComparator("en"));
  });

  it("hold for booleanComparator", () => {
    assertTotalOrder(fc.boolean(), booleanComparator);
  });

  it("hold for dateComparator", () => {
    assertTotalOrder(fc.date(), dateComparator);
  });

  it("hold for a derived comparator", () => {
    type Row = { key: number | null | undefined; label: string };
    const rows = fc.record({
      key: fc.oneof(fc.double(), fc.constant(null), fc.constant(undefined)),
      label: fc.string(),
    });
    const cmp = comparing((row: Row) => row.key, numberComparator.nullishLast())
      .thenBy((row) => row.label, stringComparator)
      .reversed();
    assertTotalOrder(rows, cmp);
  });
});

test("example", () => {
  type FeatureConfig = {
    enabled?: boolean;
    name: string;
  };

  const data: FeatureConfig[] = [
    { enabled: false, name: "Feature A" },
    { name: "Feature B" },
    { enabled: true, name: "Feature C" },
  ];

  const compareByEnabled = comparing(
    (feature: FeatureConfig) => feature.enabled,
    booleanComparator.reversed().nullishLast(),
  );

  const sortedData = data.toSorted(
    compareByEnabled.thenBy((feature) => feature.name, stringComparator),
  );

  assert.deepEqual(sortedData, [
    { enabled: true, name: "Feature C" },
    { enabled: false, name: "Feature A" },
    { name: "Feature B" },
  ]);
});
