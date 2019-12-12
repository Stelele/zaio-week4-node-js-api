const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const FacebookStrategy = require('passport-facebook')
const keys = require('../config/keys')
const User = require('../models/user')

passport.serializeUser((user,done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: keys.google.callbackURL

}, (accessToken, refreshToken, profile, done) =>{
        User.findOne({googleID:profile.id}).then((currentUser) => {
            if(currentUser){
                //already have the user
                console.log('user is: '+ currentUser.fullName)
                done(null, currentUser)

            } else {
                new User({
                    googleID: profile.id,
                    fullName: profile.displayName,
                }).save().then((newUser) => {
                    console.log("New user created: "+ newUser.fullName)
                    done(null, newUser)
                })
            }
        })
    })
)
passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: keys.facebook.callbackURL

}, (accessToken, refreshToken, profile, done) =>{
    User.findOne({facebookID:profile.id}).then((currentUser) => {
        if(currentUser){
            //already have the user
            console.log('user is: '+ currentUser.fullName)
            done(null, currentUser)

        } else {
            new User({
                facebookID: profile.id,
                fullName: profile.displayName,
            }).save().then((newUser) => {
                console.log("New user created: "+ newUser.fullName)
                done(null, newUser)
            })
        }
    })
})
)