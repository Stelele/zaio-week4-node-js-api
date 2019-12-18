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
       test = {name: req.body.name, password: hashedPassword}
       console.log(test)

       res.send(test)
   } catch {
       res.send("error hapend")
   }
})

router.get('/logout', (req, res, next) => {

})

router.post('/email',urlencoder, async (req, res, next) => {
    

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