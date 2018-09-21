const express = require('express');
var router = express.Router();
const knex = require('../models/employee.js')

router.get('/', (req, res) => {
  knex
    .from('employee')
    .select("*")
    .then((users) => {
      res.json(users)
    })
    .catch(() => {
      res.json({ success: false, message: "Error in retriving users." })
    })
});

router.post('/', (req, res) => {
  knex
    .from('employee')
    .insert({
      firstname: req.body.firstname,
      surname: req.body.surname,
      position: req.body.position,
      office: req.body.office,
      salary: req.body.salary,
      project: req.body.project,
    })
    .then(() => {
      res.json({ success: true, message: "Data successfully inserted." })
    })
    .catch(() => {
      res.json({ success: false, message: "Please try again later." })
    })
});

router.put('/:id', (req, res) => {
  console.log(req.body)
  knex
    .from('employee')
    .update({
      firstname: req.body.firstname,
      surname: req.body.surname,
      position: req.body.position,
      office: req.body.office,
      salary: req.body.salary,
      project: req.body.project,
    })
    .where('id', '=', req.params.id)
    .then((user) => {
      if (user > 0) {
        res.json({ success: false, message: "User successfully updated." })
      } else {
        res.json({ success: false, message: "Error in updating user. ID inexistent." })
      }
    })
})

router.delete('/:id', (req, res) => {
  knex
    .from('employee')
    .where('id', '=', req.params.id)
    .del()
    .then((user) => {
      if (user > 0) {
        res.json({ success: false, message: "User successfully deleted." })
      } else {
        res.json({ success: false, message: "Error in deleting user. ID inexistent." })
      }
    })
});

module.exports = router;