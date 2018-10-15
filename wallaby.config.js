module.exports = function(wallaby) {
  return {
    files: ['src/**/*.ts', { pattern: 'src/**/__tests__/*.ts', ignore: true }],

    tests: ['src/**/__tests__/*.ts'],

    compilers: {
      '**/*.ts': w.compilers.typeScript({
        typescript: require('typescript')
      })
    }
  }
}
