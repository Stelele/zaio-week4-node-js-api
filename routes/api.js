const router = require('express').Router()

const authCheck = (req, res, next) => {
    if(!req.user){
        //if user is not logged in
        res.redirect('/auth/login')

    } else {
        next()
    }
}

router.post('/property', authCheck, (req, res, next) => {
    res.send('now adding property')
})

router.put('/property/:id', authCheck,(req, res, next) => {
    res.send('now updating property ' + req.params.id)  
})

router.delete('/property/:id', authCheck, (req, res, next) => {
    res.send("now deleting property" + req.params.id)
})

router.get("/property", authCheck, (req, res, next) => {
    res.send("getting all properties")
})

router.get("/property/:id", authCheck, (req, res, next) => {
    res.send("getting property "+ req.params.id)
})

module.exports = router

