/**
 * A TypeScript library for comparing values.
 *
 * @packageDocumentation
 */

/**
 * A function that compares two values of type `T`.
 *
 * @typeParam T - The type of values to be compared.
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns A negative number if `a` sorts before `b`, zero if they are equal,
 *   or a positive number if `a` sorts after `b`.
 * @public
 */
export type CompareFn<T> = (a: T, b: T) => number;

/**
 * The kinds of values that {@link naturalOrder} can compare.
 *
 * @public
 */
export type Comparable = number | bigint | string | boolean | Date;

/**
 * The call signatures of {@link naturalOrder}. Each overload accepts one kind
 * of {@link Comparable} so that values of different kinds cannot be compared
 * by accident.
 *
 * @public
 */
export interface NaturalOrder {
  (a: number | bigint, b: number | bigint): number;
  (a: string, b: string): number;
  (a: boolean, b: boolean): number;
  (a: Date, b: Date): number;
}

/**
 * A {@link CompareFn} with methods for deriving new comparators from it.
 *
 * @typeParam T - The type of values to be compared.
 * @public
 */
export interface Comparator<T> extends CompareFn<T> {
  /**
   * Creates a comparator that imposes the reverse order of this comparator.
   *
   * The result is cached, and reversing it again returns this comparator.
   *
   * @example
   *
   * ```ts
   * const descending = numberComparator.reversed();
   * console.log([1, 3, 2].toSorted(descending)); // [3, 2, 1]
   * console.log(descending.reversed() === numberComparator); // true
   * ```
   *
   * @returns A {@link Comparator} that reverses the order of this comparator.
   */
  reversed(): Comparator<T>;

  /**
   * Creates a comparator that uses this comparator first and then breaks ties
   * with the provided compare function.
   *
   * A result of `0`, `-0`, or `NaN` from this comparator counts as a tie.
   *
   * @example
   *
   * ```ts
   * type Person = { name: string; age: number };
   * const byAge = comparing((person: Person) => person.age);
   * const byName = comparing((person: Person) => person.name);
   * const byAgeThenName = byAge.thenWith(byName);
   * ```
   *
   * @param compareFn - The compare function to break ties with.
   * @returns A {@link Comparator} that combines this comparator and
   *   `compareFn`.
   */
  thenWith(compareFn: CompareFn<T>): Comparator<T>;

  /**
   * Creates a comparator that uses this comparator first and then breaks ties
   * by comparing the values returned by `mapper` in their
   * {@link naturalOrder | natural order}.
   *
   * A result of `0`, `-0`, or `NaN` from this comparator counts as a tie.
   *
   * @example
   *
   * ```ts
   * type Person = { name: string; age: number };
   * const byAgeThenName = comparing((person: Person) => person.age).thenBy(
   *   (person) => person.name,
   * );
   * ```
   *
   * @param mapper - A function that maps a value of type `T` to a
   *   {@link Comparable} value.
   * @returns A {@link Comparator} that combines this comparator and the
   *   natural order of the mapped values.
   */
  thenBy(mapper: (value: T) => Comparable): Comparator<T>;

  /**
   * Creates a comparator that uses this comparator first and then breaks ties
   * by comparing the values returned by `mapper` with `compareFn`.
   *
   * A result of `0`, `-0`, or `NaN` from this comparator counts as a tie.
   *
   * @example
   *
   * ```ts
   * type Person = { name: string; nickname?: string };
   * const byNameThenNickname = comparing((person: Person) => person.name).thenBy(
   *   (person) => person.nickname,
   *   stringComparator.nullishLast(),
   * );
   * ```
   *
   * @typeParam U - The type of the mapped values.
   * @param mapper - A function that maps a value of type `T` to a value of
   *   type `U`.
   * @param compareFn - A function that compares two mapped values.
   * @returns A {@link Comparator} that combines this comparator and
   *   `compareFn` applied to the mapped values.
   */
  thenBy<U>(mapper: (value: T) => U, compareFn: CompareFn<U>): Comparator<T>;

  /**
   * Creates a comparator that sorts `null` and `undefined` before all other
   * values and delegates the comparison of other values to this comparator.
   *
   * `null` and `undefined` are considered equal to each other. Note that
   * `Array.prototype.sort` never passes `undefined` elements to a comparator
   * and always places them last; this method only affects `undefined` when it
   * appears inside a mapped value, for example through {@link comparing}.
   *
   * @example
   *
   * ```ts
   * const cmp = numberComparator.nullishFirst();
   * console.log([3, null, 1].toSorted(cmp)); // [null, 1, 3]
   * ```
   *
   * @returns A {@link Comparator} that handles `null` and `undefined` and
   *   delegates other comparisons to this comparator.
   */
  nullishFirst(): Comparator<T | null | undefined>;

  /**
   * Creates a comparator that sorts `null` and `undefined` after all other
   * values and delegates the comparison of other values to this comparator.
   *
   * `null` and `undefined` are considered equal to each other.
   *
   * @example
   *
   * ```ts
   * const cmp = numberComparator.nullishLast();
   * console.log([3, null, 1].toSorted(cmp)); // [1, 3, null]
   * ```
   *
   * @returns A {@link Comparator} that handles `null` and `undefined` and
   *   delegates other comparisons to this comparator.
   */
  nullishLast(): Comparator<T | null | undefined>;
}

/**
 * Compares two values of the same {@link Comparable} kind in their natural
 * order.
 *
 * - `number` and `bigint` values compare numerically, and the two kinds may
 *   be mixed. `-0` equals `0`. `NaN` equals `NaN` and sorts after every other
 *   number, including `Infinity`.
 * - `string` values compare by UTF-16 code units, the order of `<` on strings.
 * - `boolean` values sort `false` before `true`.
 * - `Date` values compare by time value. Invalid dates equal each other and
 *   sort after every valid date.
 *
 * Comparing values of different kinds is a type error, and the result at
 * runtime is unspecified.
 *
 * @example
 *
 * ```ts
 * console.log([10, 9, 1].toSorted(naturalOrder)); // [1, 9, 10]
 * console.log([10, 9, 1].toSorted()); // [1, 10, 9]
 * ```
 *
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns A negative number if `a` sorts before `b`, zero if they are equal,
 *   or a positive number if `a` sorts after `b`.
 * @public
 */
export const naturalOrder: NaturalOrder = (a: Comparable, b: Comparable): number => {
  if (a < b) return -1;
  if (a > b) return 1;
  if (a === b) return 0;
  // Neither ordered nor identical: equal Dates, NaN, or invalid Dates.
  const x = Number(a);
  const y = Number(b);
  if (x === y) return 0;
  if (Number.isNaN(x)) return Number.isNaN(y) ? 0 : 1;
  return -1;
};

const comparators = new WeakSet();

const isComparator = <T>(compareFn: CompareFn<T>): compareFn is Comparator<T> =>
  comparators.has(compareFn);

/**
 * Returns `compareFn`, or {@link naturalOrder} when it is omitted.
 *
 * @param compareFn - The compare function a caller passed, if any.
 * @returns A compare function for values of type `U`.
 */
const orNaturalOrder = <U>(compareFn: CompareFn<U> | undefined): CompareFn<U> =>
  // The public overloads only allow omitting `compareFn` when `U` is `Comparable`.
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  compareFn ?? (naturalOrder as CompareFn<U>);

/**
 * Creates a compare function that places `null` and `undefined` on one side of
 * all other values.
 *
 * @param compareFn - The compare function for values that are not nullish.
 * @param nullishSign - The result when only the first value is nullish: `-1`
 *   places nullish values first, `1` places them last.
 * @returns A compare function that handles `null` and `undefined`.
 */
const nullish =
  <T>(compareFn: CompareFn<T>, nullishSign: -1 | 1): CompareFn<T | null | undefined> =>
  (a, b) => {
    if (a == null) return b == null ? 0 : nullishSign;
    if (b == null) return -nullishSign;
    return compareFn(a, b);
  };

/**
 * Attaches the {@link Comparator} methods to `compareFn`.
 *
 * `compareFn` must be a function created by this module, never one supplied by
 * a caller, because it is modified in place.
 *
 * @param compareFn - The compare function to turn into a comparator.
 * @param reverse - The comparator `compareFn` is the reverse of, if any.
 * @returns `compareFn`, as a {@link Comparator}.
 */
const create = <T>(compareFn: CompareFn<T>, reverse?: Comparator<T>): Comparator<T> => {
  let reversed = reverse;

  const self: Comparator<T> = Object.assign(compareFn, {
    reversed: (): Comparator<T> => (reversed ??= create((a, b) => compareFn(b, a), self)),

    thenWith: (other: CompareFn<T>): Comparator<T> =>
      create((a, b) => compareFn(a, b) || other(a, b)),

    thenBy: <U>(mapper: (value: T) => U, other?: CompareFn<U>): Comparator<T> => {
      const compareMapped = orNaturalOrder(other);
      return create((a, b) => compareFn(a, b) || compareMapped(mapper(a), mapper(b)));
    },

    nullishFirst: (): Comparator<T | null | undefined> => create(nullish(compareFn, -1)),

    nullishLast: (): Comparator<T | null | undefined> => create(nullish(compareFn, 1)),
  });

  comparators.add(self);

  return self;
};

/**
 * Creates a {@link Comparator} from a compare function.
 *
 * The compare function is wrapped, never modified. If `compareFn` is already
 * a {@link Comparator}, it is returned as is.
 *
 * @example
 *
 * ```ts
 * const byLength = comparator<string>((a, b) => a.length - b.length);
 * console.log(["ccc", "a", "bb"].toSorted(byLength)); // ["a", "bb", "ccc"]
 * ```
 *
 * @typeParam T - The type of values to be compared.
 * @param compareFn - A function that compares two values of type `T`.
 * @returns A {@link Comparator} that uses the provided compare function.
 * @public
 */
export const comparator = <T>(compareFn: CompareFn<T>): Comparator<T> =>
  isComparator(compareFn) ? compareFn : create((a, b) => compareFn(a, b));

/**
 * Creates a {@link Comparator} that compares values of type `T` by mapping them
 * to {@link Comparable} values and comparing those in their
 * {@link naturalOrder | natural order}.
 *
 * TypeScript cannot infer `T` from a later `sort` call, so annotate the
 * parameter of `mapper` or the type of the result.
 *
 * @example
 *
 * ```ts
 * type Person = { name: string; age: number };
 * const people: Person[] = [
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 },
 * ];
 * const byAge = comparing((person: Person) => person.age);
 * console.log(people.toSorted(byAge)); // Bob, then Alice
 * ```
 *
 * @typeParam T - The type of values to be compared.
 * @param mapper - A function that maps a value of type `T` to a
 *   {@link Comparable} value.
 * @returns A {@link Comparator} for values of type `T` based on the natural
 *   order of their mapped values.
 * @public
 */
export function comparing<T>(mapper: (value: T) => Comparable): Comparator<T>;
/**
 * Creates a {@link Comparator} that compares values of type `T` by mapping them
 * to values of type `U` and comparing those with `compareFn`.
 *
 * TypeScript cannot infer `T` from a later `sort` call, so annotate the
 * parameter of `mapper` or the type of the result.
 *
 * @example
 *
 * ```ts
 * type Person = { name: string; nickname?: string };
 * const byNickname = comparing(
 *   (person: Person) => person.nickname,
 *   stringComparator.nullishLast(),
 * );
 * ```
 *
 * @typeParam T - The type of values to be compared.
 * @typeParam U - The type of the mapped values.
 * @param mapper - A function that maps a value of type `T` to a value of type
 *   `U`.
 * @param compareFn - A function that compares two mapped values.
 * @returns A {@link Comparator} for values of type `T` based on `compareFn`
 *   applied to their mapped values.
 * @public
 */
export function comparing<T, U>(mapper: (value: T) => U, compareFn: CompareFn<U>): Comparator<T>;
export function comparing<T, U>(mapper: (value: T) => U, compareFn?: CompareFn<U>): Comparator<T> {
  const compareMapped = orNaturalOrder(compareFn);
  return create<T>((a, b) => compareMapped(mapper(a), mapper(b)));
}

/**
 * A {@link Comparator} for comparing strings using locale-specific ordering.
 *
 * @example
 *
 * ```ts
 * const result = stringComparator("apple", "banana");
 * console.log(result); // Outputs a negative number because "apple" comes before "banana".
 * ```
 *
 * @public
 */
export const stringComparator = comparator<string>((a, b) => a.localeCompare(b));

/**
 * A {@link Comparator} for comparing numbers in ascending order.
 *
 * @example
 *
 * ```ts
 * const result = numberComparator(10, 20);
 * console.log(result); // Outputs a negative number because 10 is less than 20.
 * ```
 *
 * @public
 */
export const numberComparator = comparator<number>((a, b) => a - b);

/**
 * A {@link Comparator} for comparing bigints in ascending order.
 *
 * @example
 *
 * ```ts
 * const result = bigintComparator(10n, 20n);
 * console.log(result); // Outputs a negative number because 10n is less than 20n.
 * ```
 *
 * @public
 */
export const bigintComparator = comparator<bigint>(naturalOrder);

/**
 * A {@link Comparator} for comparing boolean values in ascending order, where
 * `false` is considered less than `true`.
 *
 * @example
 *
 * ```ts
 * const result = booleanComparator(false, true);
 * console.log(result); // Outputs a negative number because `false` is less than `true`.
 * ```
 *
 * @public
 */
export const booleanComparator = comparator<boolean>((a, b) => (a === b ? 0 : a ? 1 : -1));

/**
 * A {@link Comparator} for comparing `Date` objects in ascending order based on
 * their time values.
 *
 * @example
 *
 * ```ts
 * const result = dateComparator(
 *   new Date(2023, 0, 1),
 *   new Date(2023, 0, 2),
 * );
 * console.log(result); // Outputs a negative number because the first date is earlier than the second.
 * ```
 *
 * @public
 */
export const dateComparator = comparator<Date>((a, b) => a.getTime() - b.getTime());
