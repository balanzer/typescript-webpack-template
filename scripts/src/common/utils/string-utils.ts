export class StringUtils {
  /**
   * Checks if a string is null, undefined, or empty (after trimming whitespace).
   * @param str The string to check.
   * @returns True if the string is null, undefined, or empty; otherwise, false.
   */
  public static isEmpty(str: string | null | undefined): boolean {
    return str === null || str === undefined || str.trim().length === 0;
  }

  /**
   * Checks if a string contains another substring (case-sensitive).
   * @param str The main string.
   * @param substring The substring to search for.
   * @returns True if the string contains the substring; otherwise, false.
   */
  public static contains(str: string, substring: string): boolean {
    if (StringUtils.isEmpty(str) || StringUtils.isEmpty(substring)) {
      return false;
    }
    return str.includes(substring);
  }

  /**
   * Checks if a string contains another substring (case-insensitive).
   * @param str The main string.
   * @param substring The substring to search for.
   * @returns True if the string contains the substring (case-insensitive); otherwise, false.
   */
  public static containsIgnoreCase(str: string, substring: string): boolean {
    if (StringUtils.isEmpty(str) || StringUtils.isEmpty(substring)) {
      return false;
    }
    return str.toLowerCase().includes(substring.toLowerCase());
  }

  /**
   * Capitalizes entire string - toUpperCase.
   * @param str The string to capitalize.
   * @returns The string with the capitalized, or an empty string if input is null/undefined/empty.
   */
  public static toUpperCase(str: string | null | undefined): string {
    if (StringUtils.isEmpty(str)) {
      return "";
    }
    return str!.toUpperCase();
  }

  /**
   * Convert entire string to lowercase.
   */
  public static toLowerCase(str: string | null | undefined): string {
    if (StringUtils.isEmpty(str)) {
      return "";
    }
    return str!.toLowerCase();
  }

  /**
   * Capitalizes the first letter of a string.
   * @param str The string to capitalize.
   * @returns The string with the first letter capitalized, or an empty string if input is null/undefined/empty.
   */
  public static capitalizeFirstLetter(str: string | null | undefined): string {
    if (StringUtils.isEmpty(str)) {
      return "";
    }
    return str!.charAt(0).toUpperCase() + str!.slice(1);
  }

  /**
   * Converts the first letter of a string to lowercase.
   * @param str The string to convert.
   * @returns The string with the first letter in lowercase, or an empty string if input is null/undefined/empty.
   */
  public static lowercaseFirstLetter(str: string | null | undefined): string {
    if (StringUtils.isEmpty(str)) {
      return "";
    }
    return str!.charAt(0).toLowerCase() + str!.slice(1);
  }

  /**
   * Replaces all occurrences of a substring with another string.
   * @param str The main string.
   * @param searchValue The value to search for.
   * @param replaceValue The value to replace with.
   * @returns The string with all occurrences replaced.
   */
  public static replaceAll(
    str: string,
    searchValue: string,
    replaceValue: string
  ): string {
    if (StringUtils.isEmpty(str)) {
      return "";
    }
    if (StringUtils.isEmpty(searchValue)) {
      return str; // Cannot replace an empty search value meaningfully
    }
    return str.split(searchValue).join(replaceValue);
  }
  /**
   * Reverses a string.
   * @param str The string to reverse.
   * @returns The reversed string, or an empty string if input is null/undefined/empty.
   */
  public static reverse(str: string | null | undefined): string {
    if (StringUtils.isEmpty(str)) {
      return "";
    }
    return str!.split("").reverse().join("");
  }

  /**
   * Counts the occurrences of a substring within a string.
   * @param str The main string.
   * @param substring The substring to count.
   * @returns The number of times the substring appears in the string.
   */
  public static countOccurrences(str: string, substring: string): number {
    if (StringUtils.isEmpty(str) || StringUtils.isEmpty(substring)) {
      return 0;
    }
    const regex = new RegExp(
      substring.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "g"
    );
    const matches = str.match(regex);
    return matches ? matches.length : 0;
  }
  /**
   * Truncates a string to a specified length, optionally adding an ellipsis.
   * @param str The string to truncate.
   * @param maxLength The maximum length of the string.
   * @param addEllipsis If true, adds "..." to the end of the truncated string. Defaults to false.
   * @returns The truncated string.
   */
  public static truncate(
    str: string | null | undefined,
    maxLength: number,
    addEllipsis: boolean = false
  ): string {
    if (StringUtils.isEmpty(str) || str!.length <= maxLength) {
      return str || "";
    }
    const truncated = str!.substring(0, maxLength);
    return addEllipsis ? truncated + "..." : truncated;
  }

  /**
   * Converts a string to title case (e.g., "hello world" becomes "Hello World").
   * @param str The string to convert.
   * @returns The string in title case.
   */
  public static toTitleCase(str: string | null | undefined): string {
    if (StringUtils.isEmpty(str)) {
      return "";
    }
    return str!
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return StringUtils.capitalizeFirstLetter(word);
      })
      .join(" ");
  }

  /**
   * Generates a random string of a specified length using alphanumeric characters.
   * @param length The desired length of the random string.
   * @returns A random alphanumeric string.
   */
  public static generateRandomString(length: number): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Removes all whitespace characters (spaces, tabs, newlines) from a string.
   * @param str The string to process.
   * @returns The string with all whitespace removed.
   */
  public static removeWhitespace(str: string | null | undefined): string {
    if (StringUtils.isEmpty(str)) {
      return "";
    }
    return str!.replace(/\s/g, "");
  }
}
