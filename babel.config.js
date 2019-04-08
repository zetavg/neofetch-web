/* eslint-disable global-require */

module.exports = {
  presets: [
    [require('babel-preset-airbnb'), {
      targets: {
        node: 6,
      },
    }],
  ],
  plugins: [
    require('@babel/plugin-transform-async-to-generator'),
  ],
}
