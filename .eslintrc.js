module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-empty-pattern': 'off',
    'indent': 'off',
    'no-tabs': 'off',
    'one-var': 'off',
    'no-unused-vars': 'off',
    'no-case-declarations': 'off',
    'no-empty': 'off',
    'vue/no-unused-components': 'off',
    'no-self-assign': 'off',
    'vue/require-prop-type-constructor': 'off',
    'no-undef': 'off'
  }
}
