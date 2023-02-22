if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user')
const Course = require('./models/course')
const session = require('express-session')

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'potato-farm',
    resave: false,
    saveUninitialized: false
}))

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.get('/', (req, res) => {
    res.render('index', {session: req.session})
})

/*-------------- ROUTES --------------*/
const settingsRouter = require('./routes/settings')
app.use('/settings', settingsRouter)

const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

const logoutRouter = require('./routes/logout')
app.use('/logout', logoutRouter)

const registerRouter = require('./routes/register')
app.use('/register', registerRouter)

const fpRegister = require('./routes/forgotpassword')
app.use('/forgotpassword', fpRegister)

const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.listen(process.env.PORT || 3000)



// const course = new Course()
// course.courseName = 'Computer Vision'
// course.courseId = 'COSC 445'
// course.sections = {sectionNum: '001', courseSize: 40, term: '2022W'}
// course.save()

// async function run() {
//     try{
//         const user = await User.findOne({username: 'elvis46'})
//         //user.courses = []
//         const course = await Course.findOne({courseName: 'Computer Vision'})
//         console.log(course._id)
//         user.courses.push(course._id)
//         user.save()
//     } catch(e){
//         console.log(e.message)
//     }
// }
// run()