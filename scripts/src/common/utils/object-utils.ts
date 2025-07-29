/**
 * A utility class for common object manipulation and query functions.
 */
export class ObjectUtils {
  /**
   * Checks if a value is null or undefined. This is a common helper for many functions.
   * @param value The value to check.
   * @returns True if the value is null or undefined; otherwise, false.
   */
  private static isNil(value: any): value is null | undefined {
    return value === null || value === undefined;
  }

  /**
   * Checks if an object has no enumerable own properties.
   * Returns true for null, undefined, or an empty object literal ({}).
   * @param obj The object to check.
   * @returns True if the object is null, undefined, or empty; otherwise, false.
   */
  public static isEmpty(obj: object | null | undefined): boolean {
    return ObjectUtils.isNil(obj) || Object.keys(obj!).length === 0;
  }

  /**
   * Checks if an object has at least one enumerable own property.
   * @param obj The object to check.
   * @returns True if the object is not null, not undefined, and not empty; otherwise, false.
   */
  public static isNotEmpty<T extends object>(
    obj: T | null | undefined
  ): obj is T {
    return !ObjectUtils.isNil(obj) && Object.keys(obj!).length > 0;
  }

  /**
   * Provides a safe way to get a value from an object using a dot-notation path.
   * Prevents errors when intermediate properties are null or undefined.
   * @param obj The object to traverse.
   * @param path The path to the desired property (e.g., 'user.address.city').
   * @param defaultValue The default value to return if the path is not found or is null/undefined.
   * @returns The value at the specified path, or the default value.
   */
  public static getProperty<T, D>(
    obj: T | null | undefined,
    path: string,
    defaultValue?: D
  ): any | D {
    if (
      ObjectUtils.isNil(obj) ||
      typeof path !== "string" ||
      path.trim() === ""
    ) {
      return defaultValue;
    }

    const pathParts = path.split(".");
    let current: any = obj;

    for (const part of pathParts) {
      if (
        ObjectUtils.isNil(current) ||
        typeof current !== "object" ||
        !current.hasOwnProperty(part)
      ) {
        return defaultValue;
      }
      current = current[part];
    }
    return ObjectUtils.isNil(current) ? defaultValue : current;
  }

  /**
   * Returns a new object containing only the specified properties (keys) from the original object.
   * @param obj The source object.
   * @param keys An array of keys to pick.
   * @returns A new object with only the picked properties.
   */
  public static pick<T extends object, K extends keyof T>(
    obj: T | null | undefined,
    keys: K[]
  ): Pick<T, K> {
    if (ObjectUtils.isNil(obj)) {
      return {} as Pick<T, K>;
    }
    const newObj: Partial<T> = {};
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = obj[key];
      }
    }
    return newObj as Pick<T, K>;
  }

  /**
   * Returns a new object containing all properties from the original object except the specified ones (keys).
   * @param obj The source object.
   * @param keys An array of keys to omit.
   * @returns A new object without the omitted properties.
   */
  public static omit<T extends object, K extends keyof T>(
    obj: T | null | undefined,
    keys: K[]
  ): Omit<T, K> {
    if (ObjectUtils.isNil(obj)) {
      return {} as Omit<T, K>;
    }
    const newObj: Partial<T> = { ...obj }; // Shallow copy
    for (const key of keys) {
      delete newObj[key];
    }
    return newObj as Omit<T, K>;
  }

  /**
   * Applies a function to each value in an object and returns a new object with the transformed values.
   * @param obj The object to map over.
   * @param iteratee The function to apply to each value.
   * @returns A new object with transformed values.
   */
  public static mapValues<T extends object, R>(
    obj: T | null | undefined,
    iteratee: (value: T[keyof T], key: keyof T, obj: T) => R
  ): { [K in keyof T]: R } {
    if (ObjectUtils.isNil(obj)) {
      return {} as { [K in keyof T]: R };
    }
    const newObj: Partial<{ [K in keyof T]: R }> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = iteratee(obj[key], key, obj);
      }
    }
    return newObj as { [K in keyof T]: R };
  }

  /**
   * Filters an object's properties based on a predicate function, returning a new object.
   * @param obj The object to filter.
   * @param predicate The function that returns true for properties to keep.
   * @returns A new object containing only the filtered properties.
   */
  public static filter<T extends object>(
    obj: T | null | undefined,
    predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
  ): Partial<T> {
    if (ObjectUtils.isNil(obj)) {
      return {};
    }
    const newObj: Partial<T> = {};
    for (const key in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, key) &&
        predicate(obj[key], key, obj)
      ) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }

  /**
   * Deeply merges multiple objects into a new object. Properties from later objects
   * overwrite properties from earlier ones. Recursively merges nested objects and arrays.
   * @param sources Multiple objects to merge.
   * @returns A new, deeply merged object.
   */
  public static deepMerge<T extends object>(
    ...sources: (T | null | undefined)[]
  ): T {
    const target: any = {};

    sources.forEach((source) => {
      if (ObjectUtils.isNil(source) || typeof source !== "object") {
        return;
      }

      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          const targetValue = target[key];
          const sourceValue = source[key];

          if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
            // Concatenate arrays (consider unique elements if desired)
            target[key] = [...targetValue, ...sourceValue];
          } else if (
            typeof sourceValue === "object" &&
            sourceValue !== null &&
            !Array.isArray(sourceValue) &&
            typeof targetValue === "object" &&
            targetValue !== null &&
            !Array.isArray(targetValue)
          ) {
            // Deep merge objects
            target[key] = ObjectUtils.deepMerge(targetValue, sourceValue);
          } else {
            // Directly assign primitives or overwrite non-object types
            target[key] = sourceValue;
          }
        }
      }
    });

    return target;
  }

  /**
   * Deep clones an object or array. Note: This method has limitations (e.g., doesn't handle functions,
   * Dates, Regex, Maps, Sets, or circular references perfectly without more advanced logic).
   * For complex objects, consider a dedicated library like `lodash.clonedeep`.
   * @param obj The object or array to clone.
   * @returns A deep copy of the object or array.
   */
  public static deepClone<T>(obj: T): T {
    if (ObjectUtils.isNil(obj) || typeof obj !== "object") {
      return obj; // Return primitives directly
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime()) as T;
    }
    if (obj instanceof RegExp) {
      return new RegExp(obj.source, obj.flags) as T;
    }
    if (typeof structuredClone === "function") {
      // Use native structuredClone if available for better handling of more types
      return structuredClone(obj);
    }

    // Fallback for older environments or specific type handling
    const cloned: any = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = ObjectUtils.deepClone(obj[key]);
      }
    }
    return cloned;
  }

  /**
   * Performs a deep comparison between two objects to determine if they are equivalent.
   * Handles primitives, arrays, and nested objects. Limited handling for functions, Date, RegExp, etc.
   * @param obj1 The first object to compare.
   * @param obj2 The second object to compare.
   * @returns True if the objects are deeply equal; otherwise, false.
   */
  public static deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) {
      return true;
    }

    if (
      ObjectUtils.isNil(obj1) ||
      ObjectUtils.isNil(obj2) ||
      typeof obj1 !== "object" ||
      typeof obj2 !== "object"
    ) {
      return false;
    }

    if (Array.isArray(obj1) !== Array.isArray(obj2)) {
      return false;
    }

    if (Array.isArray(obj1)) {
      if (obj1.length !== obj2.length) {
        return false;
      }
      for (let i = 0; i < obj1.length; i++) {
        if (!ObjectUtils.deepEqual(obj1[i], obj2[i])) {
          return false;
        }
      }
      return true;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (
        !Object.prototype.hasOwnProperty.call(obj2, key) ||
        !ObjectUtils.deepEqual(obj1[key], obj2[key])
      ) {
        return false;
      }
    }
    return true;
  }

  /**
   * Transforms an array of key-value pairs (entries) into an object.
   * @param entries An array of [key, value] pairs.
   * @returns An object constructed from the entries.
   */
  public static fromEntries<K extends PropertyKey, V>(
    entries: [K, V][] | null | undefined
  ): { [P in K]?: V } {
    if (ObjectUtils.isNil(entries)) {
      return {};
    }
    // Modern JavaScript has Object.fromEntries, but this provides a polyfill/alternative
    const result: { [P in K]?: V } = {};
    for (const [key, value] of entries) {
      result[key] = value;
    }
    return result;
  }
}
