if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static(__dirname + '/public'))

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/settings', (req, res) => {
    res.render('settings')
})


app.listen(process.env.PORT || 3000)