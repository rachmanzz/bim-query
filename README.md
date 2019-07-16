# Bim Query

Bim Query is for front-end web that work with :

| framework | language | progres | status | project link | plan |
| ----------| -------- | ------- | ------ |----------| ------|
| adonisjs  | javascript (nodejs) | done | tested | [click here](https://github.com/rachmanzz/adonis-bim-server)| done |
| laravel  | php | - | - | -| immediately |
| expressjs  | javascript (nodejs) | - | - | -| - |


### Install 
   `yarn add rachmanzz/bim-query // or`
   
   `npm i --save rachmanzz/bim-query`

### How To

`const bimQuery = require('bim-query')`


#### setUrl (optional)
if you need to set default base url

`bimQuery.setUrl('https://example/')`

base url must end by /

#### setAuth (optional)
if you need to set authetication bearer

`bimQuery.auth('auth')`

value must be string without Bearer at first word again

## let to start

#### where (key, arg, value)
- where (key, value)

    for example, looking for id with number 1

    the query is `bimQuery.where('id', 1)`
- where (key, arg, value)

    if you need to put bigger that, small than, but not same 

    the query is `bimQuery.where('id', '>=' , 1)`
- where (array)

    query in array, you can put more then one query like this

    the query is `bimQuery.where([ [ 'location', 'indonesia' ], [ 'age', '>', 18 ] ])`
    but you can do like this also `bimQuery.where('location', 'ind').where('age', '>', 18)`
    that will be return same

#### orwhere (key, arg, value)
same with where

#### wherelike (key, value, position)

position Value
- start_with: (value: string)

    looking for column {key} that start with {value}

    for example : `wherelike('key', 'a', 'start_with')`
- end_with: (value: string)

    looking for column {key} that end with {value}
- any_position: (value: string)

    looking for column {key} that have {value} in any position
- have_at_{number}: (value: string)

    looking for column {key} that have {value} in the {number}th position
- start_min_{number}: (value: string)

    looking for column {key} start with {value} and are at least {number} characters in length
- start_with_end: (value: array)

    Finds any values that start with {value[0]} and ends with {value[1]}

    for example : `wherelike('key', ['a', 'd'], 'start_with_end')`

#### between (key, value, value)
if you are looking between some value, for example age between 0-18 `between('age', 0, 18)`

#### groupby (key)

#### offset (key)

#### limit (key)

#### orderby (key, value)

#### with (key)

if table has relation

#### paginate(max, page) same with page(max, page)
- paginate(page)
- paginate(max, page)

### first
if you need return just one column

### generate()
generate to query object, you can use to third party library

### release()
make sure you release if you using this library more than one action in same page
for example `bimQuery.release().where().with().orderby()`

### get(url, option)
return for axios library action (promise or async)
`bimQuery.release().where().with().orderby().page(1).get('user')`

### post(url, data, option)

### put(url, data, option)

### delete(url, option)
