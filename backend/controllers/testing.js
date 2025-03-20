router = require('express').Router()
const Contact = require('../models/contact')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
    await Note.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
  })
  
  module.exports = router