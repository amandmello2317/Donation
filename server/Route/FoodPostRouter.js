const express = require('express')

const multer = require('multer')
const {FoodPostInsert, FoodPostView, FodPostViewAll,FoodPostDelete,Ngofoodrequest,NgoremoveRequest} = require('../Controller/FoodPostController')
const fetchAdmin = require('../Middleware/UserAuth')



const FoodPostRouter = express.Router()

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


FoodPostRouter.post("/foodpostinsert/:id", fetchAdmin,upload.array('foodpost'),FoodPostInsert)
FoodPostRouter.get("/foodview/:id", fetchAdmin,FoodPostView)
FoodPostRouter.get("/foodviewall", fetchAdmin,FodPostViewAll)
FoodPostRouter.delete("/deletefoodpost/:id",fetchAdmin,FoodPostDelete)
FoodPostRouter.put("/createrequest/:pid/:nid", fetchAdmin,Ngofoodrequest)
FoodPostRouter.put("/removerequest/:pid/:nid", fetchAdmin,NgoremoveRequest)





module.exports = FoodPostRouter
