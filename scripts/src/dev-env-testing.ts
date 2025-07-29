import { Logger } from "./logger/logger";

/**
 * TestDevEnv class for testing development environment
 * This class is used to ensure that the development environment is set up correctly
 */
export class TestDevEnv {
  private logger = new Logger("test-env");

  /**
   *
   * To Test - Format on Save & Double Quotes
   *
   * Replace value with a string that contains double quotes with single quotes and save
   * Format on Save should should replace with double quotes.
   * This is to ensure that the test environment can handle strings with double quotes correctly.
   */
  private checkDoubleQuotes: string = "test double quotes";

  public constructor() {
    this.logger.log("TestDevEnv initialized.");
  }

  //eslint error - missing return type error
  public runTest() {
    //eslint error - console.log not allowed.
    console.log("Running test for double quotes:", this.checkDoubleQuotes);
  }
}
