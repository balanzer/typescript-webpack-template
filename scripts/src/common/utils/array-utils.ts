/**
 * A utility class for common array manipulation and query functions.
 */
export class ArrayUtils {
  /**
   * Checks if an array is null, undefined, or empty.
   * @param arr The array to check.
   * @returns True if the array is null, undefined, or empty; otherwise, false.
   */
  public static isEmpty<T>(arr: T[] | null | undefined): boolean {
    return arr === null || arr === undefined || arr.length === 0;
  }

  /**
   * Checks if an array is not null, not undefined, and has at least one element.
   * @param arr The array to check.
   * @returns True if the array is not empty; otherwise, false.
   */
  public static isNotEmpty<T>(arr: T[] | null | undefined): arr is T[] {
    return arr !== null && arr !== undefined && arr.length > 0;
  }

  /**
   * Gets the first element of an array.
   * @param arr The array.
   * @returns The first element, or undefined if the array is empty.
   */
  public static first<T>(arr: T[] | null | undefined): T | undefined {
    if (ArrayUtils.isEmpty(arr)) {
      return undefined;
    }
    return arr![0];
  }

  /**
   * Gets the last element of an array.
   * @param arr The array.
   * @returns The last element, or undefined if the array is empty.
   */
  public static last<T>(arr: T[] | null | undefined): T | undefined {
    if (ArrayUtils.isEmpty(arr)) {
      return undefined;
    }
    return arr![arr!.length - 1];
  }

  /**
   * Returns a new array with duplicate values removed.
   * Uses a Set for efficient uniqueness checking.
   * @param arr The array to process.
   * @returns A new array with only unique values.
   */
  public static unique<T>(arr: T[] | null | undefined): T[] {
    if (ArrayUtils.isEmpty(arr)) {
      return [];
    }
    return Array.from(new Set(arr!));
  }

  /**
   * Flattens a nested array (up to one level deep).
   * For deep flattening, consider `Array.prototype.flat()` with recursion or a library.
   * @param arr The array to flatten.
   * @returns A new, flattened array.
   */
  public static flatten<T>(arr: (T | T[])[] | null | undefined): T[] {
    if (ArrayUtils.isEmpty(arr)) {
      return [];
    }
    return arr!.reduce((acc: T[], val: T | T[]) => {
      return acc.concat(Array.isArray(val) ? val : [val]);
    }, []);
  }

  /**
   * Removes all occurrences of a specific value from an array.
   * Returns a new array without the removed values.
   * @param arr The array to modify.
   * @param value The value to remove.
   * @returns A new array with the specified value removed.
   */
  public static removeValue<T>(arr: T[] | null | undefined, value: T): T[] {
    if (ArrayUtils.isEmpty(arr)) {
      return [];
    }
    return arr!.filter((item) => item !== value);
  }

  /**
   * Removes elements from an array based on a predicate function.
   * Returns a new array with elements that do NOT satisfy the predicate.
   * @param arr The array to modify.
   * @param predicate A function that returns true for elements to be removed.
   * @returns A new array with elements filtered out by the predicate.
   */
  public static removeWhere<T>(
    arr: T[] | null | undefined,
    predicate: (item: T, index: number, array: T[]) => boolean
  ): T[] {
    if (ArrayUtils.isEmpty(arr)) {
      return [];
    }
    return arr!.filter((item, index, array) => !predicate(item, index, array));
  }

  /**
   * Returns a random element from an array.
   * @param arr The array.
   * @returns A random element, or undefined if the array is empty.
   */
  public static randomElement<T>(arr: T[] | null | undefined): T | undefined {
    if (ArrayUtils.isEmpty(arr)) {
      return undefined;
    }
    const randomIndex = Math.floor(Math.random() * arr!.length);
    return arr![randomIndex];
  }

  /**
   * Shuffles an array randomly using the Fisher-Yates (Knuth) algorithm.
   * Note: This modifies the array in place.
   * @param arr The array to shuffle.
   * @returns The shuffled array (same reference as input).
   */
  public static shuffle<T>(arr: T[] | null | undefined): T[] {
    if (ArrayUtils.isEmpty(arr)) {
      return [];
    }
    let currentIndex = arr!.length;
    let randomIndex: number;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [arr![currentIndex], arr![randomIndex]] = [
        arr![randomIndex],
        arr![currentIndex],
      ];
    }
    return arr!;
  }

  /**
   * Creates an array containing numbers in a specified range (inclusive).
   * @param start The starting number.
   * @param end The ending number.
   * @param step The step increment. Defaults to 1.
   * @returns An array of numbers in the range.
   */
  public static range(start: number, end: number, step: number = 1): number[] {
    if (step === 0) {
      throw new Error("Step cannot be zero.");
    }
    const result: number[] = [];
    if (start < end) {
      for (let i = start; i <= end; i += step) {
        result.push(i);
      }
    } else {
      // start >= end
      for (let i = start; i >= end; i -= step) {
        result.push(i);
      }
    }
    return result;
  }

  /**
   * Groups an array of objects by a common property.
   * @param arr The array of objects to group.
   * @param keyGetter A function that returns the key for each object.
   * @returns A Map where keys are the group keys and values are arrays of objects belonging to that group.
   */
  public static groupBy<T, K>(
    arr: T[] | null | undefined,
    keyGetter: (item: T) => K
  ): Map<K, T[]> {
    const map = new Map<K, T[]>();
    if (ArrayUtils.isEmpty(arr)) {
      return map;
    }
    arr!.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  /**
   * Finds the intersection of two arrays (elements common to both).
   * @param arr1 The first array.
   * @param arr2 The second array.
   * @returns A new array containing common elements.
   */
  public static intersection<T>(
    arr1: T[] | null | undefined,
    arr2: T[] | null | undefined
  ): T[] {
    if (ArrayUtils.isEmpty(arr1) || ArrayUtils.isEmpty(arr2)) {
      return [];
    }
    const set2 = new Set(arr2!);
    return arr1!.filter((item) => set2.has(item));
  }

  /**
   * Finds the union of two arrays (all unique elements from both).
   * @param arr1 The first array.
   * @param arr2 The second array.
   * @returns A new array containing all unique elements from both arrays.
   */
  public static union<T>(
    arr1: T[] | null | undefined,
    arr2: T[] | null | undefined
  ): T[] {
    const combined = [...(arr1 || []), ...(arr2 || [])];
    return ArrayUtils.unique(combined);
  }

  /**
   * Finds the difference between two arrays (elements in arr1 but not in arr2).
   * @param arr1 The first array.
   * @param arr2 The second array.
   * @returns A new array containing elements present in arr1 but not in arr2.
   */
  public static difference<T>(
    arr1: T[] | null | undefined,
    arr2: T[] | null | undefined
  ): T[] {
    if (ArrayUtils.isEmpty(arr1)) {
      return [];
    }
    if (ArrayUtils.isEmpty(arr2)) {
      return [...arr1!]; // If arr2 is empty, difference is just arr1
    }
    const set2 = new Set(arr2!);
    return arr1!.filter((item) => !set2.has(item));
  }

  /**
   * Batches an array into chunks of a specified size.
   * @param arr The array to batch.
   * @param chunkSize The maximum size of each chunk.
   * @returns An array of arrays (chunks).
   */
  public static chunk<T>(
    arr: T[] | null | undefined,
    chunkSize: number
  ): T[][] {
    if (ArrayUtils.isEmpty(arr) || chunkSize <= 0) {
      return [];
    }
    const result: T[][] = [];
    for (let i = 0; i < arr!.length; i += chunkSize) {
      result.push(arr!.slice(i, i + chunkSize));
    }
    return result;
  }

  /**
   * Sums all numeric elements in an array.
   * Non-numeric elements are ignored.
   * @param arr The array of numbers.
   * @returns The sum of all numeric elements.
   */
  public static sum(arr: (number | any)[] | null | undefined): number {
    if (ArrayUtils.isEmpty(arr)) {
      return 0;
    }
    return arr!.reduce((acc: number, val: any) => {
      if (typeof val === "number" && !isNaN(val)) {
        return acc + val;
      }
      return acc;
    }, 0);
  }

  /**
   * Calculates the average of all numeric elements in an array.
   * Non-numeric elements are ignored.
   * @param arr The array of numbers.
   * @returns The average of numeric elements, or 0 if no numeric elements.
   */
  public static average(arr: (number | any)[] | null | undefined): number {
    if (ArrayUtils.isEmpty(arr)) {
      return 0;
    }
    let sum = 0;
    let count = 0;
    arr!.forEach((val) => {
      if (typeof val === "number" && !isNaN(val)) {
        sum += val;
        count++;
      }
    });
    return count === 0 ? 0 : sum / count;
  }

  /**
   * Performs a custom sort on an array of objects based on a property.
   * @param arr The array of objects to sort.
   * @param property The property name to sort by.
   * @param order 'asc' for ascending (default), 'desc' for descending.
   * @returns The sorted array (modifies in place).
   */
  public static sortByProperty<T>(
    arr: T[] | null | undefined,
    property: keyof T,
    order: "asc" | "desc" = "asc"
  ): T[] {
    if (ArrayUtils.isEmpty(arr)) {
      return [];
    }
    arr!.sort((a, b) => {
      const valA = a[property];
      const valB = b[property];

      if (valA < valB) {
        return order === "asc" ? -1 : 1;
      }
      if (valA > valB) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
    return arr!;
  }
}
