const { NoteModel : Note } = require('../models/note')

const NoteController = {

    findById: async (req, res) => {
        const id = req.params.id
        const { user } = req.token
        const note = await Note.findOne({_id: id, userId: user._id})
        if (note) {
            res.status(200).json(note)
        } else {
            res.status(404).json({message: "Note not found."})
        }
    },

    findAll: async (req, res) => {
        const { user } = req.token
        const notes = await Note.find({ userId: user._id })
        res.status(200).json(notes)
    },

    save: async (req, res) => {
        const { user } = req.token
        const note = {
            title: req.body.title,
            description: req.body.description,
            userId: user._id
        }
        const noteSaved = await Note.create(note)
        res.status(201).json(noteSaved)
    },

    update: async (req, res) => {
        const { user } = req.token
        const note = {
            title: req.body.title,
            description: req.body.description,
            userId: user._id
        }
        const id = req.params.id
        const noteUpdated = await Note.findOneAndUpdate({ _id: id, userId: user._id }, note, { new: true })
        if (noteUpdated) {
            res.status(204).json(noteUpdated)
        } else {
            res.status(404).json({message: "Note not found."})
        }
    },

    delete: async (req, res) => {
        const id = req.params.id
        const { user } = req.token
        const noteDeleted = await Note.findOneAndDelete({ _id: id, userId: user._id })
        if (noteDeleted) {
            res.status(204).json(noteDeleted)
        } else {
            res.status(404).json({message: "Note not found."})
        }
    },

}

module.exports = { NoteController }