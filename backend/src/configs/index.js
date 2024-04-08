require('dotenv').config()

module.exports = {
    databaseConfig: {
        uri: process.env.DB_URI || 'mongodb://root:example@localhost:27017/'
    },
    apiConfig: {
        port: process.env.API_PORT || 3000
    }
}