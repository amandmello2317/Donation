const mongoose = require('mongoose')

const {Schema} = mongoose

const NgoSchema = new Schema({
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
    nphoto:[],

    certificate:[],
    password:{
        type:String
    },
    request:{
        type:String
    }

})

module.exports = mongoose.model('ngo', NgoSchema)