const bimQuery = require('./dist/bim-query.min')

const biminit = new bimQuery.init()

biminit.setUrl('https://reqres.in/')

const result = biminit.where('age', 18).orderby('id', 'desc')

result.get('api/users?page=1')
.then(res=> {
    console.log(res)
}).catch(err=> {
    console.log(err)
})