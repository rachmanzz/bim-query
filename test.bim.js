const bimQuery = require('./dist/bim-query.min')

bimQuery.setUrl('https://reqres.in/')

const result = bimQuery.where('age', 18).orderby('id', 'desc')

result.get('api/users?page=1')
.then(res=> {
    console.log(res)
}).catch(err=> {
    console.log(err)
})