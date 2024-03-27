const express = require('express')
const server = express()
const cors = require('cors')

const connectDB = require('./db/connection')
const routes = require('./routes/router')

const { databaseConfig, apiConfig } = require('./configs/')

server.use(cors())
server.use(express.json())
server.use('/api', routes)

const PORT = apiConfig.port

const { user, pass, host, port } = databaseConfig

connectDB(user, pass, host, port)

server.listen(PORT, () => {
    console.log('Server online!')
})