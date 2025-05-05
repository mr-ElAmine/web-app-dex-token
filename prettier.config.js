/** @type {import('prettier').Config} */
export default {
  semi: true,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  jsxSingleQuote: true,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'auto',
  embeddedLanguageFormatting: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
      },
    },
  ],
};
