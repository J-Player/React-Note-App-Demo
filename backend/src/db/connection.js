const mongoose = require('mongoose')
const { databaseConfig } = require('../configs/')

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(databaseConfig.uri)
        console.log('Connected to the database')
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

module.exports = connectDB