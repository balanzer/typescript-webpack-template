import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

/**
 *
 * Rule Severities
 *
 * "off" or 0 - turn the rule off.
 * "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code).
 * "error" or 2 - turn the rule on as an error (exit code is 1 when triggered).
 */

export default defineConfig([
  { files: ["src/**/*.{js,mjs,cjs,ts}"] },
  { ignores: ["**/webpack.config.js", "dist/**"] },
  { files: ["src/**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      eqeqeq: "error",
      "no-unused-vars": "warn",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "error",
    },
  },
  {
    files: ["src/scripts/logger/logger.ts"],
    rules: {
      "no-console": "off", // Allow console logs in logger file
      "no-unused-vars": "off",
    },
  },
]);
