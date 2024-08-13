import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
// import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
// import { fixupConfigRules } from "@eslint/compat";
import { fixupPluginRules } from '@eslint/compat';
import i18nPlugin from 'eslint-plugin-i18next';
// import jest from 'eslint-plugin-jest';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import pathChecker from 'eslint-plugin-path-checker-ulbi-tv';
import unusedImports from "eslint-plugin-unused-imports";

/**@type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
  {
    ignores: ["node_modules", "build", 'eslint.config.mjs', 'scripts'],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    settings: {
      version: "detect",
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json'],
        globals: {
          ...globals.browser,
          __IS_DEV__: true,
          __API__: true,
          __PROJECT__: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      'i18next': i18nPlugin,
      react,
      'react-hooks': fixupPluginRules(reactHooks),
      "path-checker-ulbi-tv": pathChecker,
      "unused-imports": unusedImports,
    },
    rules: {
      'react/jsx-indent': [2, 2],
      'react/jsx-indent-props': [2, 2],
      indent: [2, 2],
      // jsx не разрешен в файлах tsx:
      "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".tsx"] },],
      // абсолют пути ошибка:
      "import/no-unresolved": "off",
      "import/prefer-default-export": "off",
      // чтоб ошибка не была на unused перем.
      "no-unused-vars": "warn",
      '@typescript-eslint/no-unused-vars': 'warn',
      // class?: string; делает не обяз.:
      "react/require-default-props": "off",

      // исп. jsx, но не импорт React
      // начиная с 17-версии не надо:
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      // spread для пропсов всгда плохо
      // иск.: ui comp. button, input etc., обертки
      'react/jsx-props-no-spreading': 'warn',
      // fdeclaration лучше исп говорит:
      'react/function-component-definition': 'off',
      'no-shadow': 'off',
      "react/display-name": 0,

      "i18next/no-literal-string": 1,
      'jsx-a11y/no-static-element-interactions': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',

      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "error", // Checks effect dependencies
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "no-undef": "off",

      'path-checker-ulbi-tv/path-checker': ['error', { alias: '@' }],
      'path-checker-ulbi-tv/public-api-imports': ['error', {
        alias: '@',
        testFilePatterns: ['**/*.test.*', '**/StoreDecorator.tsx'],
        ignoreImportPatterns: [
          '**/StoreProvider',
          '**/testing',
        ],
      }],

      'unused-imports/no-unused-imports': "error",
      // "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off"
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  // ...fixupConfigRules(pluginReactConfig),
  // ...fixupConfigRules(r),
);