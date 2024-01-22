const mongoose = require('mongoose')

const {Schema} = mongoose

const RequestFoodSchema = new Schema({
    foodpostId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'foodPost'
    },
    ngoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ngo"
    },
    catId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Caterning"
    },
    request:{
        type:String
    },

},{
    timestamps:true
})

module.exports = mongoose.model("foodrequest", RequestFoodSchema)