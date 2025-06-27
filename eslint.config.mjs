import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["src/**/*.{js,mjs,cjs,ts}"] },
  { ignores: ["**/webpack.config.js", "dist/**"] },
  { files: ["src/**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "off",
      "no-explicit-any": "off",
      "prefer-const": ["off", { ignoreReadBeforeAssign: true }],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]);
