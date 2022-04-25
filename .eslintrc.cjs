module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      parser: 'yaml-eslint-parser',
      extends: ['plugin:yml/recommended', 'plugin:yml/prettier', 'plugin:prettier/recommended'],
    },
    {
      files: ['*.html', '*.js', '*.json', '*.jsx', '*.md', '.github/**/*.*'],
      extends: ['auto'],
    },
    {
      files: ['.github/workflows/*.{yml,yaml}'],
      processor: 'actions/actions',
    },
    {
      files: ['*.ts'],
      plugins: ['simple-import-sort', 'import', 'jest', '@typescript-eslint', 'security', 'github'],
      extends: [
        'auto',
        'plugin:actions/recommended',
        'eslint:recommended',
        'plugin:import/typescript',
        'plugin:github/recommended',
        'plugin:security/recommended',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'es2022',
        sourceType: 'module',
        project: ['./tsconfig.json', './__tests__/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      rules: {
        'i18n-text/no-en': 'off',
        'eslint-comments/no-use': 'off',
        'import/no-namespace': 'off',
        'no-unused-vars': 'off',
        'import/no-unresolved': [
          'error',
          {
            ignore: ['@octokit/openapi-types'],
          },
        ],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            ts: 'never',
          },
        ],
        'sort-imports': 'off',

        'linebreak-style': ['error', 'unix'],
        'no-plusplus': 'off',
        'import/first': 'error',
        'github/no-then': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        'security/detect-non-literal-fs-filename': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          { accessibility: 'no-public' },
        ],
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-ts-comment': 'error',
        camelcase: 'off',

        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/func-call-spacing': ['error', 'never'],

        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-extraneous-class': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-function-type': 'warn',
        '@typescript-eslint/prefer-includes': 'error',

        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        semi: 'error',
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unbound-method': 'error',
        'space-before-function-paren': 'off',
      },
      env: {
        node: true,
        es2021: true,
        'jest/globals': true,
      },
      globals: {
        NodeJS: true,
      },
    },
  ],
};
