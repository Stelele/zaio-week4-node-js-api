const router = require('express').Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const bodyParser = require('body-parser')

const urlencoder = bodyParser.urlencoded({extended: false})

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.get('/sign-up', (req, res, next) => {
    
})

router.post('/sign-up', urlencoder, async (req, res, next) => {
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

})

router.post('/email',urlencoder, async (req, res, next) => {
    const foundUser = User.find({email: req.body.email})

    if( foundUser == null){
        res.status(400).send("Cannot find User")
    }

    try {
       var check = await bcrypt.compare(req.body.password, foundUser.password) 

       if(check){
           res.send("You are logged In")
       } else {
           res.send("Incorrect Password")
       }
    } catch(err) {
        res.status(500).send(err)
    }

})

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {

})

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email',]
}))

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {

    
})

module.exports = router