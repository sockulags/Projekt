/* eslint-disable import/no-commonjs */
module.exports = {
  extends: ['@internal/eslint-config', 'plugin:@next/next/core-web-vitals'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
};
