const express = require('express')
const router = express.Router()
const util = require('./../utility')
const User = require('./../models/user')


router.get('/', util.isAuthenticated, (req, res) => {
    res.render('user/profile', {session: req.session})
})

router.get('/', (req, res) => {
    res.redirect('login')
})

router.get('/edit', util.isAuthenticated, (req, res) => {
    try {
        const user = req.session.user
        console.log(user)
    } catch(e) {
        console.log(e.message)
    }
    res.render('user/edit', {session: req.session})
})

router.post('/save', util.isAuthenticated, async (req, res) => {
    try {
        let user = await User.findOne({username: req.session.user.username})
        console.log(user)
        user.userPage = {
            bio: req.body.bio,
            links: req.body.links
        }
        console.log(user)
        await user.save()
        res.redirect('./')
    } catch(e) {
        console.log(e.message)
    }
})

module.exports = router