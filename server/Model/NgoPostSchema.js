const mongoose = require('mongoose')

const {Schema} = mongoose

const NgoPostSchema = new Schema({
    ngopost:[],
    ngoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ngo"
    }

})

module.exports = mongoose.model('ngopost', NgoPostSchema)