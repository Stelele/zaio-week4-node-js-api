const router = require('express').Router()
const passport = require('passport')

router.get('/login', (req, res, next) => {
    
    res.send("login screen")
})

router.get('/sign-up', (req, res, next) => {

})

router.get('/logout', (req, res, next) => {

})

router.post('/email', (req, res, next) => {

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