module.exports = {
  root: true,
  extends: ['@internal/eslint-config'],
  settings: {
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.base.json'],
      },
    },
  },
};
