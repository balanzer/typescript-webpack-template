import { SimpleCalculator } from "../../src/examples/simple-calculator";
describe("add function", () => {
  test("should add two numbers correctly", () => {
    const calculator: SimpleCalculator = new SimpleCalculator();
    expect(calculator.add(1, 2)).toBe(3);
  });
});
describe("subtract function", () => {
  test("should subtract two numbers correctly", () => {
    const calculator: SimpleCalculator = new SimpleCalculator();
    expect(calculator.subtract(5, 3)).toBe(2);
  });
});
