module.exports = {
  env: {
    // @see https://stackoverflow.com/questions/49250221/fetch-is-undefined-and-localstorage-is-undefined-on-using-eslint-config-ai
    browser: true,
    // @see https://github.com/eslint/eslint/issues/9812
    es2020: true,
  },
  parserOptions: {
    // @see https://stackoverflow.com/questions/61628947/eslint-optional-chaining-error-with-vscode & https://eslint.org/docs/latest/use/configure/language-options#specifying-parser-options
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // @see https://react.dev/learn/editor-setup#linting & 'plugin:react/jsx-runtime' for React 17+: https://github.com/jsx-eslint/eslint-plugin-react#configuration-legacy-eslintrc- & https://prettier.io/docs/en/integrating-with-linters.html
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.js', '.tailwind.config.cjs', '**/__*'],
  plugins: ['simple-import-sort'],
  rules: {
    // This rule is working correctly when running script `eslint .`, but not when using VSCode's ESLint extension, thus turned off
    'react/prop-types': 'off',
    // `simple-import-sort`: https://dev.to/julioxavierr/sorting-your-imports-with-eslint-3ped
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    // Personal preference:
    camelcase: ['error', { properties: 'always' }],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
};
