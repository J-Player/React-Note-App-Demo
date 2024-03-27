import NoteModel from "../models/Note"
import axios from "axios"

const ax = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        "Content-Type" : "application/json",
    }
})

export const createNote = async (note: NoteModel) => {
    return await ax.post('/notes', note)
}

export const findNote = async (id: string) => {
    return await ax.get(`/notes/${id}`)
}

export const findAllNote = async () => {
    return await ax.get(`/notes/all`)
}

export const deleteNote = async (id: string) => {
    return await ax.delete(`/notes/${id}`)
}

export const updateNote = async (id: string, note: NoteModel) => {
    return await ax.put(`/notes/${id}`, note)
}

export default {
	createNote,
    findNote,
	findAllNote,
	deleteNote,
	updateNote,
}
