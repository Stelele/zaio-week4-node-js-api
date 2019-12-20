const router = require('express').Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const bodyParser = require('body-parser')

var session
const urlencoder = bodyParser.urlencoded({extended: false})

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.get('/sign-up', (req, res, next) => {
    res.render('sign-up')
})

router.post('/sign-up', urlencoder, async (req, res, next) => {
    console.log(req.body)
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
       var userDetails = {fullName: req.body.name, password: hashedPassword, email: req.body.email}

       var newUser = new User(userDetails).save((err, user) => {
            if(err) res.send(err)

            res.send(user)
       })       

   } catch(err) {
       res.status(500).send(err)
   }
})

router.get('/logout', (req, res, next) => {
    req.logOut()

    res.send(req.user)
})

router.post('/email',urlencoder, async (req, res, next) => {
    const foundUser = await User.find({email: req.body.email})

    if( foundUser == null){
        res.status(400).send("Cannot find User")
    }

    try {
        var same = await bcrypt.compare(req.body.password, foundUser[0].password) 

        if(same){
            console.log(foundUser)
            session = req.session

            session.emailLogIn.id = foundUser[0].id
            session.emailLogIn.fullName = foundUser[0].fullName
            session.emailLogIn.email = foundUser[0].email 
            
            res.redirect("/")

        } else {
            
            res.render('login',{err: "Incorrect Password"})
        }
    
       
    } catch(err) {
        res.render('login',{err: "Incorrect Password"})
    }

})

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/')
})

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email']
}))

router.get('/facebook/redirect', passport.authenticate('facebook'), (err,req, res, next) => {

    res.redirect('/')
})

module.exports = router