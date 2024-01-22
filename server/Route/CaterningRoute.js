const express = require('express')
const {CaterningSignUp, Caterninglogin,AllCat, CaterningProfile, CaterningUpdate} = require('../Controller/CaterningController')
const multer = require('multer')
const fetchAdmin = require('../Middleware/UserAuth')



const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'upload')
    },
    filename: function(req, file, cb){
        const unique = Date.now()
        cb(null, unique+ "-" + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/signup',upload.fields([{ name: 'certificate', maxCount: 1 }, { name: 'cphoto', maxCount: 1 }]), CaterningSignUp)
router.post('/login', Caterninglogin)
router.get('/caterningprofile/:id',fetchAdmin ,CaterningProfile)
router.get('/allcaterning',fetchAdmin,AllCat)
router.put('/caterningypdate/:id', fetchAdmin,CaterningUpdate)

module.exports = router