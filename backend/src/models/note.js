const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    }
})

const NoteModel = mongoose.model('note', NoteSchema)

module.exports = { NoteModel }