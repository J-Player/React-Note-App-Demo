const { NoteModel : Note } = require('../models/note')

const NoteController = {

    findById: async (req, res) => {
        const id = req.params.id
        const note = await Note.findById(id)
        if (note) {
            res.status(200).json(note)
        } else {
            res.status(404).json({message: "Note not found."})
        }
    },

    findAll: async (req, res) => {
        const notes = await Note.find()
        res.status(200).json(notes)
    },

    save: async (req, res) => {
        const note = {
            title: req.body.title,
            description: req.body.description,
        }
        const noteSaved = await Note.create(note)
        res.status(201).json(noteSaved)
    },

    update: async (req, res) => {
        const note = {
            title: req.body.title,
            description: req.body.description,
        }
        const id = req.params.id
        const noteUpdated = await Note.findByIdAndUpdate(id, note, {new: true})
        if (noteUpdated) {
            res.status(204).json(noteUpdated)
        } else {
            res.status(404).json({message: "Note not found."})
        }
    },

    delete: async (req, res) => {
        const id = req.params.id
        const noteDeleted = await Note.findByIdAndDelete(id)
        if (noteDeleted) {
            res.status(204).json(noteDeleted)
        } else {
            res.status(404).json({message: "Note not found."})
        }
    },

}

module.exports = { NoteController }