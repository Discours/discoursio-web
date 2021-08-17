module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['svelte3', '@typescript-eslint', 'prettier'],
  ignorePatterns: ['*.cjs'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte'],
    createDefaultProgram: true,
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
}
