const express = require("express")
const server = express()

const connectDB = require("./db/connection")
const routes = require("./routes/router")

const path = require('path')

const { apiConfig } = require("./configs/")

server.use(express.json())
server.use("/api", routes)
server.use(express.static(path.join(__dirname, '../../frontend/dist')))
server.get("*", (req, res) => res.sendFile(path.join(__dirname, '../../frontend/dist/index.html')))

const PORT = apiConfig.port

connectDB().then(() => {
    console.log('Connected to the database')
	server.listen(PORT, () => {
		console.log("Server online!")
	})
}).catch(err => console.error(err))
