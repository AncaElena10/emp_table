const knex = require("../db.js")

knex.schema
  .hasTable('user', (exists) => {
    if (!exists) {
      knex.schema
        .createTable('user', (table) => {
          table.increments('id')
          table.string('firstname').notNullable()
          table.string('lastname').notNullable()
          table.string('email').notNullable().unique('email')
          table.string('password').notNullable()
          table.string('verify').notNullable()
          table.string('gender')
          table.string('bio')
          table.string('location')
          table.string('hobby')
          table.string('githubName')
          table.string('twitterName')
          table.string('facebookName')
          table.string('youtubeName')
          table.date('birthday')
          table.boolean('publicBirthday')
          table.integer('phoneNumber')
          table.binary('profilePicture')
        })
        .then(() => {
          console.log('>> User table created successfully.')
        })
        .catch(() => {
          console.log('>> An error occur while creating table User.')
        })
    }
  })

module.exports = knex