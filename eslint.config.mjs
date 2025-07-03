import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

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
  { files: ["src/scripts/**/*.{js,mjs,cjs,ts}"] },
  {
    ignores: [
      "**/webpack.config.js",
      "**/eslint.config.mjs",
      "dist/**",
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
    files: ["src/scripts/**/*.js"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["src/scripts/**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
]);
