const express = require('express')
const router = express.Router()
const User = require('.././models/user')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', async (req, res) => {
    let user = new User()
    user.username = req.body.username
    user.email = req.body.email
    try{
        user.passwordHash = await bcrypt.hash(req.body.password, 10)
        await user.save()
    } catch(e) {
        console.log(e.message)
    } 
    res.redirect('/')
})

module.exports = router