const express = require('express')
const router = express.Router()
const util = require('./../utility')
const User = require('./../models/user')


router.get('/', util.isAuthenticated, async (req, res) => {
    let user = req.session.user
    // Initialize user page if nonexistant
    if(!user.userPage) {
        user.userPage = {
            bio: "",
            links: "",
            profilePicturePath: ""
        }
        console.log(user)
        try {
            await User.updateOne({username: user.username}, {$set:{userPage: user.userPage}})
        } catch(e) {
            console.log(e)
        }
        
    }
    res.render('user/profile', {session: req.session})
})

router.get('/', (req, res) => {
    res.redirect('login')
})

router.get('/edit', util.isAuthenticated, (req, res) => {
    res.render('user/edit', {session: req.session})
})

router.post('/save', util.isAuthenticated, async (req, res) => {
    try {
        let user = req.session.user
        console.log(user)
        user.userPage = {
            bio: req.body.bio,
            links: req.body.links
        }
        await User.updateOne({username: user.username}, {$set:{ userPage: user.userPage}})
        res.redirect('/user')
    } catch(e) {
        console.log(e)
    }
})

module.exports = router