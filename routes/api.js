const router = require('express').Router()
const Property = require('../models/property')
const bodyParser = require('body-parser')

const urlParser = bodyParser.urlencoded({extended:false})

const authCheck = (req, res, next) => {
    if(!req.user){
        //if user is not logged in
        res.redirect('/auth/login')

    } else {
        next()
    }
}

router.post('/property', authCheck, (req, res, next) => {
    var property = new Property(req.body).save((err, newProperty) => {
        if(err) res.send(err)

        res.send(newProperty)
    })
})

router.put('/property/:id',authCheck,urlParser,(req, res, next) => {
    console.log("in put")
    var updateProp = Property.findByIdAndUpdate(req.params.id, req.body, (err, updatedDoc) => {
        if(err) res.send(err)
        var prop = Property.findById(updatedDoc.id, (err, got) => {
            if(err) res.send(err)

            res.send(got)

        })

    })
    
})

router.delete('/property/:id',authCheck,  (req, res, next) => {
    var DeletedProperty = Property.findByIdAndDelete(req.params.id, (err, deletedProp) => {
        if(err) res.send(err)

        res.send(deletedProp.name + " was sucessfully deleted")

    })

})

router.get("/property",authCheck,  (req, res, next) => {
    var allPropertis = Property.find({}, (err,allProp) => {
        if(err) res.send(err)

        res.send(allProp)
    })
})

router.get("/property/:id",authCheck,  (req, res, next) => {
    var uniqueProperty = Property.findById(req.params.id, (err, property) => {
        if(err) res.send(err)

        res.send(property)
    })
})

module.exports = router

