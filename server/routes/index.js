const express = require('express')
const router = express.Router({mergeParams:true})

router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/order', require('./order.routes'))
router.use('/phone', require('./phone.routes'))
router.use('/color', require('./color.routes'))

module.exports = router