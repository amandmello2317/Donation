const express = require('express')
const { NgoSignUp, NgoLogin, NgoProfile,NgoUpdate, AllNgo,AccepNgo,RejectNgo,CancleNgo } = require('../Controller/NgoController')
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

router.post('/signup', upload.fields([{ name: 'certificate', maxCount: 1 }, { name: 'nphoto', maxCount: 1 }]),NgoSignUp)
router.post('/login', NgoLogin)
router.get('/ngoprofile/:id', fetchAdmin,NgoProfile)
router.put('/ngoupdate/:id', fetchAdmin,NgoUpdate)
router.get('/allngo', fetchAdmin,AllNgo)

router.put('/acceptngo/:id', fetchAdmin,AccepNgo)
router.put('/canclengo/:id', fetchAdmin,CancleNgo)
router.put('/rejectngo/:id', fetchAdmin,RejectNgo)


module.exports = router