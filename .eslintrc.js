module.exports = {
  extends: ['kentcdodds', 'kentcdodds/react', 'plugin:prettier/recommended'],
  rules: {
    'no-negated-condition': 'off',
    'max-lines-per-function': 'off',
    'no-console': ['warn'],
    'babel/camelcase': 'off',
    complexity: 'off',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'ignore' },
      },
    ],
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  globals: {
    __STAGE__: false,
    __VERSION__: false,
    __CONFIG__: false,
  },
};
