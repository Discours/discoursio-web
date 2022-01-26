module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte'],
    createDefaultProgram: true,
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: [
    "svelte3",
    "@typescript-eslint",
    "simple-import-sort",
    "prettier"
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    },
    {
      files: ['*.ts'],
      extends: ['plugin:prettier/recommended']
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  settings: {
    "import/resolver": { "typescript": {} },
    'svelte3/typescript': true,
    'svelte3/ignore-styles': () => true
  },
  rules: {
    'no-unused-vars': 'off',
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error"
  }
}
