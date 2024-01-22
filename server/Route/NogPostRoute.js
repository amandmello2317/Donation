const express = require('express')
const {NgoPostInsert, PostView} = require('../Controller/NgoPostController')
const multer = require('multer')
const fetchAdmin = require('../Middleware/UserAuth')


const NgoPostRouter = express.Router()

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


NgoPostRouter.post("/ngopostinsert/:id", fetchAdmin,upload.array('ngopost'),NgoPostInsert)
NgoPostRouter.get("/postview/:id", fetchAdmin,PostView)



module.exports = NgoPostRouter
