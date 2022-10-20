module.exports = {
  "ecmaFeatures": {
    "jsx": true,
    "modules": true,
    "arrowFunctions": true,
    "classes": true,
    "spread": true,
  },

  env: {
    browser: true,
    es6: true,
    jest: true,
  },

  parser: "babel-eslint",

  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "array-callback-return": 0,
    "linebreak-style": 0,
    "no-use-before-define": 0,
    "no-underscore-dangle": 0,
    "quotes": [
      2,
      "single"
    ],
  },
};