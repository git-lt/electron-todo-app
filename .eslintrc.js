module.exports = {
  extends: '@antfu',
  ignorePatterns: ['dist-electron'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
