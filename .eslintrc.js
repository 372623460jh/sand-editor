/**
 * eslint配置
 */
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/typescript/prettier'),
  settings: {},
  rules: {
    '@typescript-eslint/no-explicit-any': [0],
    '@typescript-eslint/ban-types': [0],
    '@typescript-eslint/explicit-module-boundary-types': [0],
    '@typescript-eslint/no-empty-function': [0],
    '@typescript-eslint/ban-ts-comment': [0],
    'react/display-name': [0],
    '@typescript-eslint/no-var-requires': [0],
    '@typescript-eslint/no-unused-vars': [0],
  },
};
