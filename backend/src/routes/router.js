const router = require('express').Router()
const noteRouter = require('./noterouter')

router.use('/', noteRouter)

module.exports = router