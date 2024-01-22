const mongoose = require('mongoose')

const {Schema} = mongoose

const FoodPostSchema = new Schema({
    foodtype:{
        type:String
    },
    location:{
        type:String
    },
    quandity:{
        type:String
    },
    description:{
        type:String
    },
    foodpostimg:[],
    catId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Caterning"
    },
    requests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ngo"
    }]

},{
    timestamps:true
})

module.exports = mongoose.model('foodPost', FoodPostSchema)