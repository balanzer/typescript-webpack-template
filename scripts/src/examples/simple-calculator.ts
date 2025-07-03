export class SimpleCalculator {
  /**
   * Adds two numbers and returns the sum.
   * @param a The first number.
   * @param b The second number.
   * @returns The sum of a and b.
   */
  add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Subtracts the second number from the first and returns the difference.
   * @param a The first number (minuend).
   * @param b The second number (subtrahend).
   * @returns The difference of a and b.
   */
  subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * Multiplies two numbers and returns the product.
   * @param a The first number.
   * @param b The second number.
   * @returns The product of a and b.
   */
  multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divides the first number by the second and returns the quotient.
   * Throws an error if the divisor is zero.
   * @param a The first number (dividend).
   * @param b The second number (divisor).
   * @returns The quotient of a and b.
   * @throws Error if b is 0.
   */
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Cannot divide by zero.");
    }
    return a / b;
  }

  /**
   * Calculates the remainder when the first number is divided by the second.
   * Throws an error if the divisor is zero.
   * @param a The dividend.
   * @param b The divisor.
   * @returns The remainder of the division.
   * @throws Error if b is 0.
   */
  modulo(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Cannot perform modulo with zero divisor.");
    }
    return a % b;
  }

  /**
   * Raises the base to the exponent power.
   * @param base The base number.
   * @param exponent The exponent.
   * @returns The result of base raised to the exponent power.
   */
  power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }

  /**
   * Calculates the square root of a number.
   * Throws an error if the number is negative.
   * @param a The number.
   * @returns The square root of a.
   * @throws Error if a is negative.
   */
  squareRoot(a: number): number {
    if (a < 0) {
      throw new Error("Cannot calculate square root of a negative number.");
    }
    return Math.sqrt(a);
  }
}
