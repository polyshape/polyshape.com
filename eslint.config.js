import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores([
    "node_modules",
    "dist",
    "coverage",
    ".vercel",
    ".netlify",
  ]),
  {
    ignores: [
      "public/**",
      "*.js",
      "*.cjs",
      "*.mjs",
      "*.jsx",
      "**/*.js",
      "**/*.cjs",
      "**/*.mjs",
      "**/*.jsx",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    rules: {
      // Align key rules with poly_components
      quotes: ["error", "double", { avoidEscape: true }],
      "no-console": "warn",
      "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],

      // TypeScript rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true }
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  // Typed linting pass similar to poly_components
  {
    files: [
      "src/**/*.{ts,tsx}",
      "tests/**/*.{ts,tsx}",
      "setupTests.ts",
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-floating-promises": "error",
    },
  },
  {
    files: ["*.config.{ts,js,cjs,mjs}", "scripts/**/*.{ts,js}"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
]);
