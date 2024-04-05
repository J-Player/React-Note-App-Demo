import { useEffect, useState } from "react"
import NoteModel from "../models/Note"
import Note from "../components/Note"
import styled from "styled-components"
import { Color } from "../styles/palette"
import api from "../api"
import useAuth from "../hooks/useauth"

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #eee;
	min-height: 100vh;
	header {
		background-color: ${Color.bg_primary};
		width: 100%;
		color: ${Color.text_primary};
		padding: 2rem;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		span, h1 {
			font-size: 2rem;
		}
		h1 {
			position: absolute;
			left: 50%;
			translate: -50%;
			text-transform: uppercase;
		}
		button {
			background-color: transparent;
			border: 2px solid transparent;
			border-radius: 0.5rem;
			cursor: pointer;
			font-weight: bold;
			padding: 1rem;
			font-size: 1.6rem;
			border-color: red;
			color: red;
			&:hover {
				color: ${Color.text_primary};
				background-color: red;
			}
		}
	}

	.btn-wrapper {
		display: flex;
		gap: 2rem;
		padding: 1rem;
		button {
			background-color: transparent;
			border: 2px solid transparent;
			border-radius: 0.5rem;
			cursor: pointer;
			font-weight: bold;
			padding: 1rem;
			font-size: 1.6rem;
			&.btn-create-note {
				border-color: ${Color.text_highlight};
				color: ${Color.text_highlight};
				&:hover {
					color: ${Color.text_primary};
					background-color: ${Color.text_highlight};
				}
			}
			&.btn-delete-all {
				border-color: red;
				color: red;
				&:hover {
					color: ${Color.text_primary};
					background-color: red;
				}
			}
		}
	}

	.note-list-wrapper {
		display: flex;
		flex-wrap: wrap;
		max-width: 940px;
		gap: 10px;
		overflow-x: hidden;
		overflow-y: auto;
		padding-bottom: 10vh;
		padding: 1rem;
		.note {
			border-radius: 1rem;
			box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.25);
			background-color: #fff;
			height: 300px;
			width: 300px;
			padding: 1rem;
			display: flex;
			gap: 1rem;
			flex-direction: column;
			input {
				width: 100%;
			}
			textarea {
				width: 100%;
				height: 100%;
				overflow-y: auto;
			}
			* {
				font-size: 1.6rem;
			}
			p {
				word-break: break-word;
				flex-grow: 1;
				overflow-y: auto;
			}
			.btn-note-wrapper {
				display: flex;
				align-self: end;
				gap: 1rem;
				button {
					background-color: transparent;
					border: none;
					outline: none;
					cursor: pointer;
				}
			}
		}
	}
`

const Home = () => {
	const [noteList, setNoteList] = useState<NoteModel[]>([])
	const { handleLogout } = useAuth()

	useEffect(() => {
		api.get("/notes/all").then((r) => setNoteList(r.data))
	}, [])

	const handlerAddNote = async () => {
		const response = await api.post("/notes", { title: "Title here", description: "Description here" })
		if (response.status == 201) {
			const note: NoteModel = {
				_id: response.data._id,
				title: response.data.title,
				description: response.data.description,
				userId: response.data.userId,
			}
			setNoteList((prev) => [note, ...prev])
		}
	}

	const handlerDeleteAllNote = () => {
		noteList.map((n) => api.delete(`/notes/${n._id}`))
		setNoteList([])
	}

	const handlerEditNote = async (id: string, note: NoteModel) => {
		const response = await api.put(`/notes/${id}`, note)
		if (response.status == 204) {
			setNoteList((prev) => {
				const notes = [...prev]
				const index = notes.findIndex((n) => n._id == id)
				const nt: NoteModel = {
					...notes[index],
					title: response.data.title,
					description: response.data.description,
				}
				notes[index] = nt
				return [...notes]
			})
		}
	}

	const handlerDeleteNote = async (id: string) => {
		const response = await api.delete(`/notes/${id}`)
		if (response.status == 204) {
			setNoteList((prev) => prev.filter((n) => n._id !== id))
		}
	}

	return (
		<HomeContainer>
			<header>
				<span>Account: John</span>
				<h1>Notes</h1>
				<button onClick={handleLogout}>Logout</button>
			</header>
			<div className='btn-wrapper'>
				<button className='btn-create-note' onClick={handlerAddNote}>
					Create Note
				</button>
				<button className='btn-delete-all' onClick={handlerDeleteAllNote}>
					Delete All
				</button>
			</div>
			<main>
				<div className='note-list-wrapper'>
					{noteList.map((n) => {
						return (
							<Note
								key={n._id}
								title={n.title}
								description={n.description}
								id={n._id}
								handleDeleteNote={handlerDeleteNote}
								handleEditNote={handlerEditNote}
							/>
						)
					})}
				</div>
			</main>
		</HomeContainer>
	)
}

export default Home
