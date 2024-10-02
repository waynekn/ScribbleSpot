import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  {
    plugins: {
      importPlugin,
    },
    rules: {
      "no-duplicate-imports": "error",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
