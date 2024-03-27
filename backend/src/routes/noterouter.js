const router = require('express').Router()
const { NoteController } = require('../controllers/notecontroller')

router.route('/notes').post((req, res) => NoteController.save(req, res))
router.route('/notes/all').get((req, res) => NoteController.findAll(req, res))
router.route('/notes/:id').get((req, res) => NoteController.findById(req, res))
router.route('/notes/:id').delete((req, res) => NoteController.delete(req, res))
router.route('/notes/:id').put((req, res) => NoteController.update(req, res))

module.exports = router