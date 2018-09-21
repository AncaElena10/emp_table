const knex = require("../db.js")

knex.schema
  .hasTable('employee', (exists) => {
    if (!exists) {
      knex.schema
        .createTable('employee', (table) => {
          table.increments('id')
          table.string('firstname');
          table.string('surname');
          table.string('office');
          table.string('position');
          table.integer('salary');
          table.text('project');
        })
        .then(() => {
          console.log('>> Employee table created successfully.')
        })
        .catch(() => {
          console.log('>> An error occur while creating table Employee.')
        })
    }
  })

module.exports = knex