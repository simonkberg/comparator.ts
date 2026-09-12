/**
 * Type-level tests. This file is never executed; `tsc --noEmit` checks it as
 * part of `pnpm test`. Each `@ts-expect-error` pins an error the API must
 * produce, and each exported value pins a signature that must compile.
 */
import {
  type CompareFn,
  type Comparator,
  bigintComparator,
  comparator,
  comparing,
  dateComparator,
  localeComparator,
  numberComparator,
  stringComparator,
} from "./index.ts";

type Person = { name: string; age: number; nickname?: string; born: Date; id: bigint };
type Employee = Person & { salary: number };

// `comparing` infers `T` from an annotated mapper parameter or from an annotated result.
export const byAge = comparing((person: Person) => person.age, numberComparator);
export const byAgeAnnotated: Comparator<Person> = comparing(
  (person) => person.age,
  numberComparator,
);
export const byName = comparing((person: Person) => person.name, stringComparator);
export const byNickname = comparing(
  (person: Person) => person.nickname,
  stringComparator.nullishLast(),
);
export const byBorn = comparing((person: Person) => person.born, dateComparator);
export const byLocaleName = comparing((person: Person) => person.name, localeComparator("sv"));
export const byId = comparing((person: Person) => person.id, bigintComparator);

// `thenBy` infers the mapper parameter from the receiver.
export const chained = byAge
  .thenBy((person) => person.name, stringComparator)
  .thenBy((person) => person.nickname, stringComparator.nullishLast())
  .thenWith((a, b) => a.age - b.age)
  .thenWith(byName);

// A comparator of a supertype is a compare function for a subtype.
export const employees: Employee[] = [];
export const sortedEmployees = employees.toSorted(byAge);
export const bySalaryThenAge = comparing(
  (employee: Employee) => employee.salary,
  numberComparator,
).thenWith(byAge);
export const byAgeForEmployees: Comparator<Employee> = comparator<Employee>(byAge);

// A plain compare function is accepted wherever a comparator is.
export const plain: CompareFn<Person> = (a, b) => a.age - b.age;
export const fromPlain = byAge.thenWith(plain);
export const fromPlainKey = byAge.thenBy(
  (person) => person.age,
  (a, b) => a - b,
);
export const wrapped = comparator(plain);

// @ts-expect-error -- a nullable key needs a nullish-aware comparator
comparing((person: Person) => person.nickname, stringComparator);
// @ts-expect-error -- the comparator must match the mapped type
comparing((person: Person) => person.name, numberComparator);
// @ts-expect-error -- the comparator is required
comparing((person: Person) => person.age);
// @ts-expect-error -- the comparator is required
byAge.thenBy((person) => person.name);
// @ts-expect-error -- without an annotation `T` is `unknown`, so the key cannot be read
comparing((person) => person.age, numberComparator); // oxlint-disable-line typescript/no-unsafe-return
// @ts-expect-error -- a comparator of a subtype cannot compare the supertype
export const bad: Comparator<Person> = comparing(
  (employee: Employee) => employee.salary,
  numberComparator,
);
// @ts-expect-error -- a comparator of a subtype cannot break ties for the supertype
byAge.thenWith(comparing((employee: Employee) => employee.salary, numberComparator));
// @ts-expect-error -- `Comparator<T>` is invariant in `T`; use `comparator<Employee>(byAge)`
export const invariant: Comparator<Employee> = byAge;
// @ts-expect-error -- `numberComparator` only compares numbers
numberComparator(1n, 2n);
