const router = require('express').Router()
const Property = require('../models/property')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now()+ '-' + file.originalname)
    }
})

const fileFiler = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error("Can only upload png and jpeg files"), false)
    }
}

const upload = multer({storage: storage,fileFilter: fileFiler})
const urlParser = bodyParser.urlencoded({extended:false})

const authCheck = (req, res, next) => {
    if(!req.user){
        //if user is not logged in
        res.redirect('/auth/login')

    } else {
        next()
    }
}

router.post('/property',upload.single('img'), (req, res, next) => {
    var property = new Property({
        name: req.body.name,
        address: req.body.address,
        price: req.body.price,
        img: req.file.path
    }).save((err, newProperty) => {
        if(err) res.send(err)

        res.send(newProperty)
    })
})

router.put('/property/:id', urlParser,upload.single('img'),(req, res, next) => {

    var updateProp = Property.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        address: req.body.address,
        price: req.body.price,
        img: req.file.path
    }, (err, oldDoc) => {
        if(err) res.send(err)

        try {
            fs.unlink(oldDoc.img, (err) => {
                if(err) 
                    console.log(err)
                else 
                    console.log("file "+ oldDoc.img +  " succefuly deleted")

            })
    
        } catch(err) {
            res.send(err)
        }
        
        var prop = Property.findById(oldDoc.id, (err, got) => {
            if(err) res.send(err)

            res.send(got)

        })

    })
    
})

router.delete('/property/:id',  (req, res, next) => {
    var DeletedProperty = Property.findByIdAndDelete(req.params.id, (err, deletedProp) => {
        if(err) res.send(err)

        res.send(deletedProp.name + " was sucessfully deleted")

    })

})

router.get("/property",  (req, res, next) => {
    var allPropertis = Property.find({}, (err,allProp) => {
        if(err) res.send(err)

        res.send(allProp)
    })
})

router.get("/property/:id",  (req, res, next) => {
    var uniqueProperty = Property.findById(req.params.id, (err, property) => {
        if(err) res.send(err)

        res.send(property)
    })
})

module.exports = router

