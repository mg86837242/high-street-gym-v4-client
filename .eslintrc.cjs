module.exports = {
  env: {
    // @see https://stackoverflow.com/questions/49250221/fetch-is-undefined-and-localstorage-is-undefined-on-using-eslint-config-ai
    browser: true,
  },
  parserOptions: {
    // @see https://stackoverflow.com/questions/61628947/eslint-optional-chaining-error-with-vscode
    //  & https://eslint.org/docs/latest/use/configure/language-options#specifying-parser-options
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // @see https://react.dev/learn/editor-setup#linting
  // & airbnb config's peer dependencies: https://www.npmjs.com/package/eslint-config-airbnb
  // & 'plugin:react/jsx-runtime' for React 17+: https://github.com/jsx-eslint/eslint-plugin-react#configuration-legacy-eslintrc-
  // & https://prettier.io/docs/en/integrating-with-linters.html
  extends: ['react-app', 'airbnb', 'plugin:react/jsx-runtime', 'prettier'],
  ignorePatterns: [
    // Unused folders && files
    'dist',
    '**/__*',
    // Temporarily ignored
  ],
  rules: {
    // Band-aid solution to lack of resolver in the backend:
    // @see: https://stackoverflow.com/questions/46208367/how-to-remove-eslint-error-no-unresolved-from-importing-react
    // & https://stackoverflow.com/questions/67316153/facing-problem-while-importing-files-in-nodejs
    'import/no-unresolved': ['warn', { caseSensitive: false }],
    'import/extensions': [
      'error',
      {
        js: 'ignorePackages',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
};
