/* eslint-disable @typescript-eslint/no-floating-promises */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  booleanComparator,
  type Comparator,
  comparator,
  comparing,
  dateComparator,
  nullsFirst,
  nullsLast,
  numberComparator,
  stringComparator,
} from "./index";

describe("comparator", () => {
  it("should create a comparator from a function", () => {
    const cmp: Comparator<number> = comparator((a, b) => a - b);
    assert.ok(cmp(1, 2) < 0);
    assert.ok(cmp(2, 1) > 0);
    assert.ok(cmp(1, 1) === 0);
  });

  it("should be able to reverse the order of comparison", () => {
    const cmp: Comparator<number> = comparator((a, b) => a - b);
    const reverseCmp = cmp.reversed();
    assert.ok(reverseCmp(1, 2) > 0);
    assert.ok(reverseCmp(2, 1) < 0);
    assert.ok(reverseCmp(1, 1) === 0);
  });

  it("should cache the reversed comparator", () => {
    const cmp: Comparator<number> = comparator((a, b) => a - b);
    const reverseCmp1 = cmp.reversed();
    const reverseCmp2 = cmp.reversed();
    assert.strictEqual(reverseCmp1, reverseCmp2);
  });

  it("should be able to chain comparators", () => {
    type TestObject = {
      num: number;
      str: string;
    };

    const cmp1 = comparator<TestObject>((a, b) => a.num - b.num);
    const cmp2 = comparator<TestObject>((a, b) => a.str.localeCompare(b.str));
    const compoundCmp = cmp1.thenComparing(cmp2);

    const obj1a = { num: 1, str: "a" };
    const obj1b = { num: 1, str: "b" };
    const obj2b = { num: 2, str: "b" };

    assert.ok(compoundCmp(obj1a, obj2b) < 0);
    assert.ok(compoundCmp(obj1a, obj1b) < 0);
    assert.ok(compoundCmp(obj1a, obj1a) === 0);
    assert.ok(compoundCmp(obj2b, obj1a) > 0);
  });

  it("should be possible to pass compare method to sort method", () => {
    const cmp = comparator<number>((a, b) => a - b);
    assert.deepEqual([3, 1, 2].sort(cmp), [1, 2, 3]);
  });
});

describe("comparing", () => {
  type TestObject = { num: number };
  const obj1 = { num: 1 };
  const obj2 = { num: 2 };
  const obj3 = { num: 3 };

  it("should create a mapping comparator", () => {
    const cmp: Comparator<number> = comparator((a, b) => a - b);
    const mappingCmp = comparing((x: TestObject) => x.num, cmp);
    assert.ok(mappingCmp(obj1, obj2) < 0);
    assert.ok(mappingCmp(obj2, obj1) > 0);
    assert.ok(mappingCmp(obj1, obj1) === 0);
  });

  it("should be possible to pass compare method to sort method", () => {
    const cmp: Comparator<number> = comparator((a, b) => a - b);
    const mappingCmp = comparing((x: TestObject) => x.num, cmp);
    assert.deepEqual([obj3, obj1, obj2].sort(mappingCmp), [obj1, obj2, obj3]);
  });
});

describe("stringComparator", () => {
  it("should be a string comparator", () => {
    assert.ok(stringComparator("a", "b") < 0);
    assert.ok(stringComparator("b", "a") > 0);
    assert.ok(stringComparator("a", "a") === 0);
  });

  it("should be possible to pass compare method to sort method", () => {
    assert.deepEqual(["c", "a", "b"].sort(stringComparator), ["a", "b", "c"]);
  });
});

describe("numberComparator", () => {
  it("should be a number comparator", () => {
    assert.ok(numberComparator(1, 2) < 0);
    assert.ok(numberComparator(2, 1) > 0);
    assert.ok(numberComparator(1, 1) === 0);
  });

  it("should be possible to pass compare method to sort method", () => {
    assert.deepEqual([3, 1, 2].sort(numberComparator), [1, 2, 3]);
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
    assert.deepEqual([true, false, true].sort(booleanComparator), [
      false,
      true,
      true,
    ]);
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
    assert.deepEqual([date2, date1, date3].sort(dateComparator), [
      date1,
      date2,
      date3,
    ]);
  });
});

describe("nullsFirst", () => {
  it("should create a nulls first comparator", () => {
    const cmp = nullsFirst(numberComparator);
    assert.ok(cmp(null, 1) < 0);
    assert.ok(cmp(1, null) > 0);
    assert.ok(cmp(null, null) === 0);
  });

  it("should be possible to pass compare method to sort method", () => {
    const cmp = nullsFirst(numberComparator);
    assert.deepEqual([3, null, 2].sort(cmp), [null, 2, 3]);
  });
});

describe("nullsLast", () => {
  it("should create a nulls last comparator", () => {
    const cmp = nullsLast(numberComparator);
    assert.ok(cmp(1, null) < 0);
    assert.ok(cmp(null, 1) > 0);
    assert.ok(cmp(null, null) === 0);
  });

  it("should be possible to pass compare method to sort method", () => {
    const cmp = nullsLast(numberComparator);
    assert.deepEqual([3, null, 2].sort(cmp), [2, 3, null]);
  });
});
