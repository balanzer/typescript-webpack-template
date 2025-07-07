import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import checkFile from "eslint-plugin-check-file";
/**
 *
 * Rule Severities
 *
 * "off" or 0 - turn the rule off.
 * "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code).
 * "error" or 2 - turn the rule on as an error (exit code is 1 when triggered).
 */

const LINT_LEVEL = {
  ERROR: "error", //actual value is "error"
  WARN: "warn", //actual value is "warn"
  OFF: "off", //actual value is "off"
};

export default defineConfig([
  { files: ["scripts/src/**/*.{js,mjs,cjs,ts}"] },
  {
    ignores: [
      "**/webpack.config.js",
      "**/eslint.config.mjs",
      "**/jest.config.js",
      "dist/**",
      "coverage/**",
      "**/tsconfig.json",
      "**/package-lock.json",
      "**/package.json",
    ],
  },
  {
    files: ["**/*.{json,jsonc}"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"],
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
  {
    files: ["scripts/src/**/*.js"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["scripts/src/**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  //rules configuration
  //common rules - Best Practices
  {
    rules: {
      eqeqeq: [LINT_LEVEL.ERROR, "always", { null: "ignore" }],
      "no-var": LINT_LEVEL.ERROR,
      "no-unused-vars": LINT_LEVEL.OFF,
      "@typescript-eslint/no-unused-vars": LINT_LEVEL.ERROR,
      "no-console": LINT_LEVEL.ERROR,
      "prefer-const": [LINT_LEVEL.ERROR, { ignoreReadBeforeAssign: true }],
      "@typescript-eslint/no-explicit-any": LINT_LEVEL.ERROR,
      curly: LINT_LEVEL.ERROR,
      "no-else-return": LINT_LEVEL.ERROR,
      "no-fallthrough": LINT_LEVEL.ERROR,
      "no-implicit-globals": LINT_LEVEL.ERROR,
      "no-eval": LINT_LEVEL.ERROR,
      "no-redeclare": LINT_LEVEL.ERROR,
      "no-param-reassign": LINT_LEVEL.ERROR,
      "prefer-const": LINT_LEVEL.ERROR,
    },
  },
  //rules configuration
  //standard rules
  {
    files: ["scripts/src/**/*.ts"], // Apply this configuration to TypeScript files
    rules: {
      "@typescript-eslint/ban-ts-comment": LINT_LEVEL.ERROR,
      "@typescript-eslint/ban-tslint-comment": LINT_LEVEL.ERROR,
      "class-methods-use-this": LINT_LEVEL.OFF,
      "@typescript-eslint/class-methods-use-this": LINT_LEVEL.OFF,
      "@typescript-eslint/explicit-function-return-type": LINT_LEVEL.ERROR,
      "@typescript-eslint/explicit-member-accessibility": LINT_LEVEL.ERROR,
    },
  },
  //rules configuration - file naming conventions
  {
    plugins: {
      "check-file": checkFile, // Register the plugin
    },
    rules: {
      "check-file/filename-naming-convention": [
        LINT_LEVEL.ERROR,
        {
          "scripts/src/**/*.{js,ts}": "KEBAB_CASE", // Apply KEBAB_CASE("my-example-file.ts") to .js and .ts files
        },
      ],
      "check-file/folder-naming-convention": [
        LINT_LEVEL.ERROR,
        {
          "scripts/*/": "KEBAB_CASE", // Apply KEBAB_CASE(hello-world, logger) to all folders in src/
        },
      ],
    },
  },
  //rules configuration
  //Enforcing naming conventions
  {
    files: ["scripts/src/**/*.ts"], // Apply this configuration to TypeScript files
    rules: {
      "@typescript-eslint/naming-convention": [
        // Use the naming-convention rule from the typescript-eslint plugin
        LINT_LEVEL.ERROR,
        {
          selector: "typeLike", // Target class names, interfaces, type aliases, etc.
          format: ["PascalCase"], // Enforce PascalCase
        },
        {
          selector: "variable", // Target variables (let, const, var)
          format: ["camelCase"], // Enforce camelCase format
        },
        // You may want to allow UPPER_CASE for const variables that are intended as constants
        {
          selector: "variable",
          modifiers: ["const"], // Target const variables
          format: ["camelCase", "UPPER_CASE"], // Allow either camelCase or UPPER_CASE for const variables
        },
      ],
    },
  },
  //rules configuration - Possible Errors
  {
    files: ["scripts/src/**/*.ts"], // Apply this configuration to TypeScript files
    rules: {
      "no-var": LINT_LEVEL.ERROR,
      "no-undef": LINT_LEVEL.ERROR, // Disallow the use of undeclared variables
      "no-extra-semi": LINT_LEVEL.ERROR, // Disallow unnecessary semicolons
      "no-empty": LINT_LEVEL.ERROR, // Disallow empty block statements
      "no-unreachable": LINT_LEVEL.ERROR, // Disallow unreachable code after return, throw, continue, and break statements
      "no-unreachable-loop": LINT_LEVEL.ERROR, // Disallow unreachable loops after a return statement
    },
  },
  //rules configuration - Stylistic Issues
  {
    files: ["scripts/src/**/*.ts"], // Apply this configuration to TypeScript files
    rules: {
      "linebreak-style": [
        LINT_LEVEL.ERROR,
        "unix", // Enforce Unix linebreaks (LF)
      ],
      "max-len": [
        LINT_LEVEL.ERROR,
        { code: 120 }, // Enforce a maximum line length of 120 characters
      ],
      "no-multiple-empty-lines": [
        LINT_LEVEL.ERROR,
        { max: 1, maxEOF: 0 }, // Allow at most one empty line and no empty lines at the end of files
      ],
      "object-curly-spacing": [
        LINT_LEVEL.ERROR,
        "always", // Enforce consistent spacing inside curly braces
      ],
      "array-bracket-spacing": [
        LINT_LEVEL.ERROR,
        "never", // Disallow spaces inside array brackets
      ],
      "comma-dangle": [
        LINT_LEVEL.ERROR,
        "always-multiline", // Require trailing commas in multiline objects and arrays
      ],
      semi: [
        LINT_LEVEL.ERROR,
        "always", // Enforce semicolons at the end of statements
      ],
      "no-trailing-spaces": LINT_LEVEL.ERROR, // Disallow trailing whitespace at the end
      "space-before-function-paren": [
        LINT_LEVEL.ERROR,
        {
          anonymous: "always", // Require a space before anonymous function parentheses
          named: "never", // Disallow a space before named function parentheses
          asyncArrow: "always", // Require a space before async arrow function parentheses
        },
      ],
      "keyword-spacing": [
        LINT_LEVEL.ERROR,
        { before: true, after: true }, // Enforce consistent spacing around keywords
      ],
      "space-infix-ops": LINT_LEVEL.ERROR, // Require spaces around infix operators
      "space-unary-ops": [
        LINT_LEVEL.ERROR,
        { words: true, nonwords: false }, // Require spaces around unary operators
      ],
      "arrow-spacing": [
        LINT_LEVEL.ERROR,
        { before: true, after: true }, // Enforce consistent spacing around arrow functions
      ],
      "comma-spacing": [
        LINT_LEVEL.ERROR,
        { before: false, after: true }, // Enforce consistent spacing around commas
      ],
      "no-whitespace-before-property": LINT_LEVEL.ERROR, // Disallow whitespace before properties
      "no-multi-spaces": LINT_LEVEL.ERROR, // Disallow multiple spaces
      "no-duplicate-imports": LINT_LEVEL.ERROR, // Disallow duplicate imports
      "no-useless-concat": LINT_LEVEL.ERROR, // Disallow unnecessary concatenation of strings
      "no-useless-rename": LINT_LEVEL.ERROR, // Disallow unnecessary renaming of imports
      "no-useless-return": LINT_LEVEL.ERROR, // Disallow unnecessary return statements
      "no-useless-escape": LINT_LEVEL.ERROR, // Disallow unnecessary escape characters
      "no-unsafe-negation": LINT_LEVEL.ERROR, // Disallow negation of the left operand of an in expression
      "no-unsafe-optional-chaining": LINT_LEVEL.ERROR, // Disallow unsafe optional chaining
      "no-unsafe-finally": LINT_LEVEL.ERROR, // Disallow unsafe use of finally blocks
      quotes: [
        LINT_LEVEL.ERROR,
        "double", // Enforce double quotes for strings
        { avoidEscape: true }, // Allow single quotes if double quotes are used inside
      ],
    },
  },
  //rules configuration - some files require different rules
  {
    files: ["scripts/src/logger/logger.ts"],
    rules: {
      "no-console": LINT_LEVEL.OFF, // Allow console logs in logger file
      "no-unused-vars": LINT_LEVEL.OFF,
      "@typescript-eslint/no-explicit-any": LINT_LEVEL.OFF,
    },
  },
]);
