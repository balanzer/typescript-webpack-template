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
  ERROR: "off", //actual value is "error"
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
  //common rules
  {
    rules: {
      eqeqeq: [LINT_LEVEL.ERROR, "always", { null: "ignore" }],
      "no-var": LINT_LEVEL.ERROR,
      "no-unused-vars": LINT_LEVEL.OFF,
      "@typescript-eslint/no-unused-vars": LINT_LEVEL.ERROR,
      "no-console": LINT_LEVEL.ERROR,
      "prefer-const": [LINT_LEVEL.ERROR, { ignoreReadBeforeAssign: true }],
      "@typescript-eslint/no-explicit-any": LINT_LEVEL.ERROR,
    },
  },
  //rules configuration
  //standard rules
  {
    rules: {
      "@typescript-eslint/ban-ts-comment": LINT_LEVEL.ERROR,
      "@typescript-eslint/ban-tslint-comment": LINT_LEVEL.ERROR,
      "class-methods-use-this": LINT_LEVEL.OFF,
      "@typescript-eslint/class-methods-use-this": LINT_LEVEL.ERROR,
      "@typescript-eslint/explicit-function-return-type": LINT_LEVEL.ERROR,
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
    files: ["**/*.ts"], // Apply this configuration to TypeScript files
    rules: {
      "@typescript-eslint/naming-convention": [
        // Use the naming-convention rule from the typescript-eslint plugin
        "error",
        {
          selector: "typeLike", // Target class names, interfaces, type aliases, etc.
          format: ["PascalCase"], // Enforce PascalCase
        },
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
