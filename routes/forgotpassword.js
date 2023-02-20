const express = require('express')
const router = express.Router()
const User = require('.././models/user')
const nodemailer = require('nodemailer')


router.get('/', (req, res) => {
    res.render('forgotpassword')
})

router.post('/', async (req, res) => {
    let user = new User()
    try {
        user = await User.findOne({email: req.body.email})
        const html = `<h1>Hello World</h1>`
        if(user != null) {
            let transporter = nodemailer.createTransport({

            })
        }
        
    } catch(e) {
        console.log(e.message)
    }
    
})

module.exports = router