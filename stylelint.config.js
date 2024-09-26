module.exports = {
  plugins: ['stylelint-stylus', './library/stylelintPluginExtractor.js'],
  overrides: [
    {
      files: ['./patterns/**/*.styl'],
      customSyntax: 'postcss-styl',
    },
  ],
  rules: {
    'stylus/semicolon': 'never',
    'stylus/declaration-colon': 'never',
    'stylus/pythonic': 'always',
    'stylus/number-leading-zero': 'always',
    'length-zero-no-unit': true,
    '@makaira/require-variables': [
      true,
      {
        severity: 'warning',
      },
    ],
  },
}
