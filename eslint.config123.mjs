import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
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

export default defineConfig([
  { files: ["src/scripts/**/*.{js,mjs,cjs,ts}"] },
  { ignores: ["**/webpack.config.js", "**/eslint.config.mjs", "dist/**"] },
  {
    files: ["src/scripts/**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      "check-file": checkFile, // Register the plugin
    },
    rules: {
      eqeqeq: "error",
      "no-unused-vars": "off",
      "no-var": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "prefer-const": ["off", { ignoreReadBeforeAssign: true }],
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE"],
        },
      ],
      "check-file/filename-naming-convention": [
        "error", // Set rule severity to error
        {
          "src/scripts/**/*.{js,ts}": "KEBAB_CASE", // Apply KEBAB_CASE("my-example-file.ts") to .js and .ts files
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/*/": "KEBAB_CASE", // Apply KEBAB_CASE(hello-world, logger) to all folders in src/
        },
      ],
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
