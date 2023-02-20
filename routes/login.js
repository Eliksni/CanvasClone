const express = require('express')
const router = express.Router()
const User = require('.././models/user')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', async (req, res) => {
    let user = new User()
    try{
        user = await User.findOne({username: req.body.username})
        if(await bcrypt.compare(req.body.password, user.passwordHash)){
            req.session.user = user
            res.redirect('/')
        }
        else
            console.log("failure")
    } catch(e) {
        console.log(e.message)
    }
})

module.exports = router