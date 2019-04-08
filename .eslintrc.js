const path = require('path')

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  settings: {
    'import/resolver': {
      node: { paths: process.env.NODE_PATH.split(':').map(p => path.resolve(p)) },
    },
  },
  rules: {
    semi: ['error', 'never'],
  },
}
