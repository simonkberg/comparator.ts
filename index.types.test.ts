/**
 * Type-level tests. This file is never executed; `tsc --noEmit` checks it as
 * part of `pnpm test`. Each `@ts-expect-error` pins an error the API must
 * produce, and each exported value pins a signature that must compile.
 */
import {
  type Comparable,
  type CompareFn,
  type Comparator,
  comparator,
  comparing,
  naturalOrder,
  numberComparator,
  stringComparator,
} from "./index.ts";

type Person = { name: string; age: number; nickname?: string; born: Date; id: bigint };
type Employee = Person & { salary: number };

// `comparing` infers `T` from an annotated mapper parameter or from an annotated result.
export const byAge = comparing((person: Person) => person.age);
export const byAgeAnnotated: Comparator<Person> = comparing((person) => person.age);
export const byName = comparing((person: Person) => person.name, stringComparator);
export const byNickname = comparing(
  (person: Person) => person.nickname,
  stringComparator.nullishLast(),
);
export const byBorn = comparing((person: Person) => person.born);
export const byId = comparing((person: Person) => person.id);

// `thenBy` infers the mapper parameter from the receiver.
export const chained = byAge
  .thenBy((person) => person.name)
  .thenBy((person) => person.nickname, stringComparator.nullishLast())
  .thenWith((a, b) => a.age - b.age)
  .thenWith(byName);

// A comparator of a supertype is a compare function for a subtype.
export const employees: Employee[] = [];
export const sortedEmployees = employees.toSorted(byAge);
export const bySalaryThenAge = comparing((employee: Employee) => employee.salary).thenWith(byAge);
export const byAgeForEmployees: Comparator<Employee> = comparator<Employee>(byAge);

// `naturalOrder` works with `sort` for every `Comparable` kind.
export const sortedNumbers = [1, 2].toSorted(naturalOrder);
export const sortedMixed = [1n, 2].toSorted(naturalOrder);
export const sortedStrings = ["a"].toSorted(naturalOrder);
export const sortedBooleans = [true].toSorted(naturalOrder);
export const sortedDates = [new Date()].toSorted(naturalOrder);
export const asComparator = comparator<bigint>(naturalOrder).reversed().nullishFirst();

// A plain compare function is accepted wherever a comparator is.
export const plain: CompareFn<Person> = (a, b) => a.age - b.age;
export const fromPlain = byAge.thenWith(plain);
export const wrapped = comparator(plain);

// `Comparable` is the union of what `naturalOrder` accepts.
export const comparable: Comparable[] = [1, 1n, "a", true, new Date()];

// @ts-expect-error -- a nullable key needs an explicit comparator
comparing((person: Person) => person.nickname);
// @ts-expect-error -- objects have no natural order
comparing((person: Person) => person);
// @ts-expect-error -- objects have no natural order
byAge.thenBy((person) => person);
// @ts-expect-error -- values of different kinds cannot be compared
naturalOrder(1, "a");
// @ts-expect-error -- values of different kinds cannot be compared
naturalOrder(true, 1);
// @ts-expect-error -- without an annotation `T` is `unknown`, so the key cannot be read
comparing((person) => person.age); // oxlint-disable-line typescript/no-unsafe-return
// @ts-expect-error -- a comparator of a subtype cannot compare the supertype
export const bad: Comparator<Person> = comparing((employee: Employee) => employee.salary);
// @ts-expect-error -- a comparator of a subtype cannot break ties for the supertype
byAge.thenWith(comparing((employee: Employee) => employee.salary));
// @ts-expect-error -- `Comparator<T>` is invariant in `T`; use `comparator<Employee>(byAge)`
export const invariant: Comparator<Employee> = byAge;
// @ts-expect-error -- `numberComparator` only compares numbers
numberComparator(1n, 2n);
