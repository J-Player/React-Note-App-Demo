const mongoose = require('mongoose')
const { databaseConfig } = require('../configs/')

const connectDB = async (username, password, host=databaseConfig.host, port=databaseConfig.port) => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/`)
        console.log('Connected to the database')
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

module.exports = connectDB