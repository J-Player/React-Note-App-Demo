const { UserModel : User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const AuthController = {

    login: async (req, res) => {
        const { username, password } = req.body
        const user = await User.findOne({username: username})
        if (!user) {
            res.status(404).json({message: "User not found."})
        } else {
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                res.status(400).json({message: "Password incorrect."})
            } else {
                const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1d' })
                res.status(200).json({access_token: token})
            }
        }
    },

    register: async (req, res) => {
        const username = req.body.username
        const password = req.body.password
        const userExists = await User.exists({username: username})
        const passwordEncrypted = bcrypt.hashSync(password, 10)
        if (userExists) {
            return res.status(400).json({message: `User "${username}" already exists.`})
        } else {
            const user = await User.create({username: username, password: passwordEncrypted})
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(500).json({message: "Ocorreu um erro ao tentar registrar o usuário."})
            }
        }
    },

}

module.exports = { AuthController }