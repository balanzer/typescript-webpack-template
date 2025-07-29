import { StringUtils } from "../../../src/common/utils/string-utils";

describe("StringUtils", () => {
  // Test cases for the isEmpty method
  describe("isEmpty ", () => {
    test("should return true for an empty string", () => {
      expect(StringUtils.isEmpty("")).toBe(true);
    });
    test("should return true for a string with only spaces", () => {
      expect(StringUtils.isEmpty("   ")).toBe(true);
    });

    test("should return true for null input", () => {
      expect(StringUtils.isEmpty(null)).toBe(true);
    });

    test("should return true for undefined input", () => {
      expect(StringUtils.isEmpty(undefined)).toBe(true);
    });

    test("should return false for a non-empty string", () => {
      expect(StringUtils.isEmpty("hello")).toBe(false);
    });
  });

  // Test cases for the reverse method
  describe("reverse", () => {
    test("should correctly reverse a given string", () => {
      expect(StringUtils.reverse("abc")).toBe("cba");
    });

    test("should handle palindromes", () => {
      expect(StringUtils.reverse("madam")).toBe("madam");
    });

    test("should return an empty string for an empty input", () => {
      expect(StringUtils.reverse("")).toBe("");
    });

    test("should return an empty string for null input", () => {
      expect(StringUtils.reverse(null as any)).toBe("");
    });

    test("should handle strings with spaces", () => {
      expect(StringUtils.reverse("hello world")).toBe("dlrow olleh");
    });
  });

  // Test cases for the capitalize method
  describe("capitalizeFirstLetter", () => {
    test("should return the string with the first letter capitalized", () => {
      expect(StringUtils.capitalizeFirstLetter("hello")).toBe("Hello");
    });

    test("should handle single character strings", () => {
      expect(StringUtils.capitalizeFirstLetter("a")).toBe("A");
    });

    test("should return an empty string for an empty input", () => {
      expect(StringUtils.capitalizeFirstLetter("")).toBe("");
    });

    test("should return an empty string for null input", () => {
      // TypeScript might complain about null/undefined if capitalize expects string,
      // but if your JS allows it, or if you cast, this tests runtime behavior.
      // For strict TS, you might need to adjust the function signature or skip this test.
      expect(StringUtils.capitalizeFirstLetter(null as any)).toBe("");
    });

    test("should not change an already capitalized string", () => {
      expect(StringUtils.capitalizeFirstLetter("World")).toBe("World");
    });

    test("should handle strings with leading spaces (trimming is not part of capitalize)", () => {
      expect(StringUtils.capitalizeFirstLetter("  test")).toBe("  test"); // Capitalizes the first non-space char
    });
  });
});
