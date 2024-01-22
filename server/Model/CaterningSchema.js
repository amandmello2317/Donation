const mongoose = require('mongoose')

const {Schema} = mongoose

const CaterningSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String

    },
    location:{
        type:String
    },
    state:{
        type:String
    },
    district:{
        type:String
    },
    cphoto:[],
    certificate:[],
    password:{
        type:String
    }

},{
    timestamps: true
})

module.exports = mongoose.model('Caterning', CaterningSchema)