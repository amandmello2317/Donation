const express = require('express')
const {FoodPostRequest, FindFoodRequest, DeleteFoodRequest, AccepFoodRequest, RejectFoodRequest, NgoFindFoodRequest, CancleFoodRequest} = require('../Controller/RequestFoodSchemaController')
const fetchAdmin = require('../Middleware/UserAuth')

const RequestFoodRouter = express.Router()

RequestFoodRouter.post("/requestfood/:ngoid/:postid", fetchAdmin,FoodPostRequest)
RequestFoodRouter.get("/viewrequest/:id", fetchAdmin,FindFoodRequest)
RequestFoodRouter.get("/ngoviewrequest/:id", fetchAdmin, NgoFindFoodRequest)
RequestFoodRouter.delete("/deleterequest/:id", fetchAdmin, DeleteFoodRequest)
RequestFoodRouter.put("/acceptfoood/:id",fetchAdmin,  AccepFoodRequest)
RequestFoodRouter.put("/cancleacceptfoood/:id", fetchAdmin, CancleFoodRequest)
RequestFoodRouter.delete("/rejectrequest/:id",fetchAdmin,  RejectFoodRequest)


module.exports = RequestFoodRouter