'use strict'

module.exports = ctx => ({
  // eslint-disable-next-line multiline-ternary
  map: ctx.file.dirname.includes('examples') ? false : {
    inline: false,
    annotation: true,
    sourcesContent: true
  },
  plugins: {
    autoprefixer: {
      cascade: false
    },
    'postcss-combine-duplicated-selectors': {},
    'postcss-merge-rules': {}
  }
})
