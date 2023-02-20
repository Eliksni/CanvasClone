const express = require('express')
const router = express.Router()
const util = require('../utility')


router.get('/', util.isAuthenticated, (req, res) => {
    res.render('user', {session: req.session})
})

router.get('/', (req, res) => {
    res.redirect('login')
})

module.exports = router