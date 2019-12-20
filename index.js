const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const session = require('express-session')

const app = express()

const port = process.env.PORT || 4000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/public', express.static('public'))

app.use(cookieSession({
    maxAge: 24 * 60  * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

mongoose.connect(keys.mongodb.connectionString, (err) => {
    if(err) throw err
    console.log("Connected to Mongodb")

})

mongoose.Promise = global.Promise

app.use(session({secret: keys.session.cookieKey}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

//initialize routes
app.use('/auth', require('./routes/auth'))
app.use('/api', require('./routes/api'))

app.use('/', (req, res) => {
    res.render('login')
})

app.use((err, req, res, next) => {
    res.status(422).send({error: err.message})
})

app.listen(port, () => {
    console.log('now listening for requests on Port: ' + port)
})




