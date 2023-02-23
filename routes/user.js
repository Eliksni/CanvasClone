const express = require('express')
const router = express.Router()
const multer = require('multer')
const uuid = require('uuid').v4
const util = require('./../utility')
const User = require('./../models/user')


const avatars = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        cb(null, `${uuid()}-${originalName}`);
    }
})
const avatarUpload = multer({storage: avatars})


router.get('/', util.isAuthenticated, async (req, res) => {
    let user = req.session.user
    // Initialize user page if nonexistant
    if(!user.userPage) {
        user.userPage = {
            bio: "",
            links: "",
            profilePicturePath: "/img/default.jpg"
        }
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

router.post('/save', util.isAuthenticated, avatarUpload.single('avatar'), async (req, res) => {
    try {
        let user = req.session.user
        user.userPage = {
            bio: req.body.bio,
            links: req.body.links,
            profilePicturePath: ((req.file) ? `/uploads/${req.file?.filename}` : user.userPage.profilePicturePath)
        }
        await User.updateOne({username: user.username}, {$set:{ userPage: user.userPage}})
        res.redirect('/user')
    } catch(e) {
        console.log(e)
    }
})

module.exports = router