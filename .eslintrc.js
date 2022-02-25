module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: ['function-declaration', 'function-expression', 'arrow-function'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['components', './components'],
          ['lib', './lib'],
          ['styles', './styles'],
          ['hooks', './hooks'],
          ['context', './context'],
        ],
      },
    },
  },
};
