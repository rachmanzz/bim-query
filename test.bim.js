const bimQuery = require('./src/bim-query')

const biminit = new bimQuery.init()

const result = biminit.release().wherelike('key', 'aman','any_position').wherelike('key', 'aman','end_with').between('key', 0, 9).groupby('key').orderby('key2', 'asc').orderby('key2', 'desc').first()
console.log(result.generate())