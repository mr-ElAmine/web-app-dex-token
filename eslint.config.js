import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    extends: [js.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.node },
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      'import/internal-regex': '^@/',
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
        },
      ],
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Modules natifs de Node.js
            'external', // Modules externes (npm)
            'internal', // Imports interanes à votre projet
            'parent', // Imports depuis le répertoire parent
            'sibling', // Imports depuis le même répertoire
            'index', // Imports depuis un index
            'object', // Imports de type object
            'type', // Imports de types (TypeScript)
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],

      // Règles TypeScript
      '@typescript-eslint/no-explicit-any': 'warn', // Limite l’usage de `any`
      '@typescript-eslint/consistent-type-imports': 'error', // Préfère les imports de type
      '@typescript-eslint/explicit-module-boundary-types': 'error', // Autorise l’inférence des types pour les fonctions
      '@typescript-eslint/no-inferrable-types': 'warn', // Suggère de ne pas déclarer les types inférés
      '@typescript-eslint/no-floating-promises': 'off', // Attrape les promesses non gérées
      // "@typescript-eslint/no-unsafe-argument": "error",
      // "@typescript-eslint/no-unsafe-assignment": "error",
      // "@typescript-eslint/no-unsafe-call": "error",
      // "@typescript-eslint/no-unsafe-member-access": "error",
      // "@typescript-eslint/no-unsafe-return": "error",

      'no-duplicate-imports': 'error',

      // Règles React
      'react/jsx-uses-react': 'off', // Non nécessaire avec React 17+
      'react/react-in-jsx-scope': 'off', // Non nécessaire avec React 17+
      'react-hooks/rules-of-hooks': 'error', // Respect des règles des hooks React
      'react-hooks/exhaustive-deps': 'warn', // Vérifie les dépendances des hooks
    },
  },
);
