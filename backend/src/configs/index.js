module.exports = {
    databaseConfig: {
        user: process.env.userdb || 'root',
        pass: process.env.passdb || 'example',
        host: process.env.hostdb || 'localhost',
        port: process.env.portdb || 27017,
    },
    apiConfig: {
        port: process.env.port || 3000
    }
}