const mongoose = require('mongoose')
const { databaseConfig } = require('../configs/')

const connectDB = async () => {
    mongoose.set('strictQuery', true)
    return mongoose.connect(databaseConfig.uri)
}

module.exports = connectDB