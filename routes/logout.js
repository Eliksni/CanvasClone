const express = require('express')
const router = express.Router()
const User = require('.././models/user')

router.post('/', async (req, res) => {
    req.session.user = null
    res.redirect('/')
})

module.exports = router