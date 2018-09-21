const Knex = require('knex')

var knex = new Knex(
  {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'my_cruddb',
      charset: 'utf8'
    },
  })

module.exports = knex