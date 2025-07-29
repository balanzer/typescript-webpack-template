/**
 * A utility class for common number manipulation and validation functions.
 */
export class NumberUtils {
  /**
   * Checks if a value is a valid number (not NaN, null, or undefined).
   * @param value The value to check.
   * @returns True if the value is a valid number; otherwise, false.
   */
  public static isNumber(value: any): boolean {
    return typeof value === "number" && !isNaN(value);
  }

  /**
   * Checks if a number is an integer.
   * @param value The number to check.
   * @returns True if the number is an integer; otherwise, false.
   */
  public static isInteger(value: number): boolean {
    return NumberUtils.isNumber(value) && Number.isInteger(value);
  }

  /**
   * Checks if a number is positive.
   * @param value The number to check.
   * @returns True if the number is positive; otherwise, false.
   */
  public static isPositive(value: number): boolean {
    return NumberUtils.isNumber(value) && value > 0;
  }

  /**
   * Checks if a number is negative.
   * @param value The number to check.
   * @returns True if the number is negative; otherwise, false.
   */
  public static isNegative(value: number): boolean {
    return NumberUtils.isNumber(value) && value < 0;
  }

  /**
   * Checks if a number is zero.
   * @param value The number to check.
   * @returns True if the number is zero; otherwise, false.
   */
  public static isZero(value: number): boolean {
    return NumberUtils.isNumber(value) && value === 0;
  }

  /**
   * Clamps a number within a specified range.
   * @param value The number to clamp.
   * @param min The minimum allowed value.
   * @param max The maximum allowed value.
   * @returns The clamped number.
   */
  public static clamp(value: number, min: number, max: number): number {
    if (
      !NumberUtils.isNumber(value) ||
      !NumberUtils.isNumber(min) ||
      !NumberUtils.isNumber(max)
    ) {
      throw new Error("All arguments for clamp must be valid numbers.");
    }
    return Math.max(min, Math.min(value, max));
  }

  /**
   * Rounds a number to a specified number of decimal places.
   * @param value The number to round.
   * @param decimalPlaces The number of decimal places to round to. Defaults to 0.
   * @returns The rounded number.
   */
  public static round(value: number, decimalPlaces: number = 0): number {
    if (
      !NumberUtils.isNumber(value) ||
      !NumberUtils.isInteger(decimalPlaces) ||
      decimalPlaces < 0
    ) {
      throw new Error(
        "Invalid arguments for round. Value must be a number, decimalPlaces must be a non-negative integer."
      );
    }
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(value * factor) / factor;
  }

  /**
   * Generates a random integer within a specified range (inclusive).
   * @param min The minimum value (inclusive).
   * @param max The maximum value (inclusive).
   * @returns A random integer.
   */
  public static getRandomInt(min: number, max: number): number {
    if (!NumberUtils.isInteger(min) || !NumberUtils.isInteger(max)) {
      throw new Error("Min and max for getRandomInt must be integers.");
    }
    let minInt = min;
    let maxInt = max;
    if (minInt > maxInt) {
      [minInt, maxInt] = [maxInt, minInt]; // Swap if min > max
    }
    minInt = Math.ceil(minInt);
    maxInt = Math.floor(maxInt);
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
  }

  /**
   * Formats a number with a specified number of decimal places.
   * @param value The number to format.
   * @param decimalPlaces The number of decimal places to include. Defaults to 2.
   * @returns The formatted number as a string.
   */
  public static formatDecimal(
    value: number,
    decimalPlaces: number = 2
  ): string {
    if (
      !NumberUtils.isNumber(value) ||
      !NumberUtils.isInteger(decimalPlaces) ||
      decimalPlaces < 0
    ) {
      throw new Error(
        "Invalid arguments for formatDecimal. Value must be a number, decimalPlaces must be a non-negative integer."
      );
    }
    return value.toFixed(decimalPlaces);
  }

  /**
   * Converts a string to a number, returning a default value if conversion fails.
   * @param str The string to convert.
   * @param defaultValue The default value to return if conversion fails. Defaults to 0.
   * @returns The converted number or the default value.
   */
  public static toNumeric(
    str: string | null | undefined,
    defaultValue: number = 0
  ): number {
    if (typeof str !== "string" || str.trim() === "") {
      return defaultValue;
    }
    const num = parseFloat(str);
    return NumberUtils.isNumber(num) ? num : defaultValue;
  }

  /**
   * Calculates the percentage of a part out of a total.
   * @param part The part value.
   * @param total The total value.
   * @returns The percentage, or 0 if total is 0.
   */
  public static calculatePercentage(part: number, total: number): number {
    if (!NumberUtils.isNumber(part) || !NumberUtils.isNumber(total)) {
      throw new Error(
        "Both part and total must be valid numbers for calculatePercentage."
      );
    }
    if (total === 0) {
      return 0;
    }
    return (part / total) * 100;
  }

  /**
   * Checks if a number is within a specified range (inclusive).
   * @param value The number to check.
   * @param min The minimum value (inclusive).
   * @param max The maximum value (inclusive).
   * @returns True if the number is within the range; otherwise, false.
   */
  public static isInRange(value: number, min: number, max: number): boolean {
    if (
      !NumberUtils.isNumber(value) ||
      !NumberUtils.isNumber(min) ||
      !NumberUtils.isNumber(max)
    ) {
      throw new Error("All arguments for isInRange must be valid numbers.");
    }
    return value >= min && value <= max;
  }
}
