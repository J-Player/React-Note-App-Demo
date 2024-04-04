const router = require('express').Router()
const { AuthController } = require('../controllers/authcontroller')
const { NoteController } = require('../controllers/notecontroller')
const jwt = require("jsonwebtoken")

require('dotenv').config()

const middlewareJWT = (req, res, next) => {
    let token = req.headers["authorization"]
    if (!token) {
        return res.status(400).json({message: 'Token not found.'})
    }
    token = token.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).end()
        }
        req.token = user
        next()
    })
}

router.route('/auth/register').post(AuthController.register)
router.route('/auth/login').post(AuthController.login)

router.route('/notes').post(middlewareJWT, NoteController.save)
router.route('/notes/all').get(middlewareJWT, NoteController.findAll)
router.route('/notes/:id').get(middlewareJWT, NoteController.findById)
router.route('/notes/:id').delete(middlewareJWT, NoteController.delete)
router.route('/notes/:id').put(middlewareJWT, NoteController.update)

module.exports = router