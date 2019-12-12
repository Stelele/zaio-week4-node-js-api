const router = require('express').Router()

router.post('/property', (req, res, next) => {
    res.send('now adding property')
})

router.put('/property/:id',(req, res, next) => {
    res.send('now updating property ' + req.params.id)  
})

router.delete('/property/:id', (req, res, next) => {
    res.send("now deleting property" + req.params.id)
})

router.get("/property", (req, res, next) => {
    res.send("getting all properties")
})

router.get("/property/:id", (req, res, next) => {
    res.send("getting property "+ req.params.id)
})

module.exports = router

