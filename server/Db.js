const mongoose = require('mongoose')

const MongoUri = "mongodb://127.0.0.1/Donation";

const ConnectDB = async() => {
    try {
        await mongoose.connect(MongoUri)
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }

}

module.exports = ConnectDB