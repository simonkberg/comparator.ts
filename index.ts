/**
 * A TypeScript library for comparing values.
 *
 * @packageDocumentation
 */

/**
 * A function interface for comparing two objects of type `T`.
 *
 * @typeParam T - The type of objects to be compared.
 * @param a - The first object to compare.
 * @param b - The second object to compare.
 * @returns A negative number if `a` is less than `b`, zero if they are equal, or a positive number if `a` is greater than `b`.
 * @public
 */
export type CompareFn<T> = (a: T, b: T) => number;

/**
 * An interface for comparing two objects of type `T`.
 *
 * @typeParam T - The type of objects to be compared.
 * @public
 */
export interface Comparator<T> extends CompareFn<T> {
  /**
   * Creates a compound comparator that first uses this comparator and then uses another comparator
   * if the first comparison results in equality.
   *
   * @param other - Another comparator to use if the first comparison results in equality.
   * @returns A new `Comparator` that combines this comparator and the provided comparator.
   */
  thenComparing(other: Comparator<T>): Comparator<T>;

  /**
   * Creates a comparator that reverses the order of this comparator.
   *
   * @returns A new `Comparator` that reverses the order of this comparator.
   */
  reversed(): Comparator<T>;
}

/**
 * Creates a `Comparator` from a custom comparison function.
 *
 * @typeParam T - The type of objects to be compared.
 * @param compareFn - A function that compares two objects of type `T`.
 *                    Should return a negative number if the first object is less than the second,
 *                    zero if they are equal, or a positive number if the first is greater.
 * @returns A `Comparator` that uses the provided comparison function.
 * @public
 */
export const comparator = <T>(compareFn: CompareFn<T>): Comparator<T> => {
  function Comparator(a: T, b: T) {
    return compareFn(a, b);
  }

  Comparator.thenComparing = function CompoundComparator(other: Comparator<T>) {
    return comparator<T>((a, b) => {
      const result = Comparator(a, b);
      return result !== 0 ? result : other(a, b);
    });
  };

  let reversed: Comparator<T> | null = null;

  Comparator.reversed = function ReverseComparator() {
    if (reversed === null) {
      reversed = comparator<T>((a, b) => Comparator(b, a));
    }

    return reversed;
  };

  return Comparator;
};

/**
 * Creates a `Comparator` that compares objects of type `T` by mapping them to values of type `U`
 * using a provided mapping function and then comparing the mapped values using a given comparison function.
 *
 * @typeParam T - The type of objects to be compared.
 * @typeParam U - The type of the mapped values used for comparison.
 * @param mapper - A function that maps an object of type `T` to a value of type `U`.
 * @param compareFn - A function that compares two mapped values of type `U`.
 *                    Should return a negative number if the first value is less than the second,
 *                    zero if they are equal, or a positive number if the first is greater.
 * @returns A `Comparator` for comparing objects of type `T` based on their mapped values.
 * @public
 */
export const comparing = <T, U>(
  mapper: (object: T) => U,
  compareFn: CompareFn<U>,
): Comparator<T> => comparator<T>((a, b) => compareFn(mapper(a), mapper(b)));

/**
 * A `Comparator` for comparing strings using locale-specific ordering.
 *
 * @example
 * ```ts
 * const result = stringComparator("apple", "banana");
 * console.log(result); // Outputs a negative number because "apple" comes before "banana".
 * ```
 *
 * @returns A `Comparator` instance for comparing strings.
 * @public
 */
export const stringComparator = comparator<string>((a, b) =>
  a.localeCompare(b),
);

/**
 * A `Comparator` for comparing numbers in ascending order.
 *
 * @example
 * ```ts
 * const result = numberComparator(10, 20);
 * console.log(result); // Outputs a negative number because 10 is less than 20.
 * ```
 *
 * @returns A `Comparator` instance for comparing numbers.
 * @public
 */
export const numberComparator = comparator<number>((a, b) => a - b);

/**
 * A `Comparator` for comparing boolean values.
 *
 * @example
 * ```ts
 * const result = booleanComparator(true, false);
 * console.log(result); // Outputs 1 because `true` is greater than `false`.
 * ```
 *
 * @returns A `Comparator` instance for comparing boolean values.
 * @public
 */
export const booleanComparator = comparator<boolean>((a, b) =>
  a === b ? 0 : a ? 1 : -1,
);

/**
 * A `Comparator` for comparing `Date` objects in ascending order based on their time values.
 *
 * @example
 * ```ts
 * const result = dateComparator(new Date(2023, 0, 1), new Date(2023, 0, 2));
 * console.log(result); // Outputs a negative number because the first date is earlier than the second.
 * ```
 *
 * @returns A `Comparator` instance for comparing `Date` objects.
 * @public
 */
export const dateComparator = comparator<Date>(
  (a, b) => a.getTime() - b.getTime(),
);

/**
 * Creates a `Comparator` that handles `null` or `undefined` values.
 * It delegates the comparison of non-null values to a provided comparison function.
 *
 * @typeParam T - The type of objects to be compared.
 * @param nullsFirst - A boolean indicating whether `null` or `undefined` values should be
 *                     considered less than non-null values. If `true`, `null` or `undefined` values
 *                     are considered less; otherwise, they are considered greater.
 * @param compareFn - A function that compares two non-null values of type `T`.
 *                    Should return a negative number if the first value is less than the second,
 *                    zero if they are equal, or a positive number if the first is greater.
 * @returns A `Comparator` that handles `null` or `undefined` values and delegates non-null comparisons to the provided function.
 * @internal
 */
function NullComparator<T>(
  nullsFirst: boolean,
  compareFn: CompareFn<T>,
): Comparator<T | null | undefined> {
  return comparator<T | null | undefined>((a, b) => {
    if (a == null && b == null) return 0;
    if (a == null) return nullsFirst ? -1 : 1;
    if (b == null) return nullsFirst ? 1 : -1;
    return compareFn(a, b);
  });
}

/**
 * Creates a `Comparator` that considers `null` or `undefined` values as less than non-null values.
 *
 * @typeParam T - The type of objects to be compared.
 * @param compareFn - A function that compares two non-null values of type `T`.
 *                    Should return a negative number if the first value is less than the second,
 *                    zero if they are equal, or a positive number if the first is greater.
 * @returns A `Comparator` that treats `null` or `undefined` values as less than non-null values
 *          and delegates non-null comparisons to the provided function.
 * @public
 */
export const nullsFirst = <T>(compareFn: CompareFn<T>) =>
  NullComparator(true, compareFn);

/**
 * Creates a `Comparator` that considers `null` or `undefined` values as greater than non-null values.
 *
 * @typeParam T - The type of objects to be compared.
 * @param compareFn - A function that compares two non-null values of type `T`.
 *                    Should return a negative number if the first value is less than the second,
 *                    zero if they are equal, or a positive number if the first is greater.
 * @returns A `Comparator` that treats `null` or `undefined` values as greater than non-null values
 *          and delegates non-null comparisons to the provided function.
 * @public
 */
export const nullsLast = <T>(compareFn: CompareFn<T>) =>
  NullComparator(false, compareFn);
