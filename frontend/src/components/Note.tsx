import { useRef, useState } from "react"
import NoteModel from "../models/Note"

interface Props {
	id?: string
	title: string
	description: string
	handleDeleteNote: (id: string) => void
	handleEditNote: (id: string, note: NoteModel) => void
}

const Note = (props: Props) => {
	const [editing, setEditing] = useState(false)
	const [id, setId] = useState(props.id)
	const [title, setTitle] = useState(props.title)
	const [description, setDescription] = useState(props.description)
	const { handleDeleteNote, handleEditNote } = props
	const titleRef = useRef<HTMLInputElement>(null)
	const descriptionRef = useRef<HTMLTextAreaElement>(null)

	const handlerEditNote = async () => {
		setEditing(true)
	}

	const handlerCancelEdit = async () => {
		setId(props.id)
		setTitle(props.title)
		setDescription(props.description)
		setEditing(false)
	}

	const handlerConfirmEdit = async () => {
		setId(props.id)
		setTitle(titleRef.current!.value)
		setDescription(descriptionRef.current!.value)
		handleEditNote(id!, { title: title, description: description })
		setEditing(false)
	}

	return (
		<div className='note'>
			<input type='hidden' name='note-id' value={id} />
			<h1>
				{editing ? (
					<input
						ref={titleRef}
						type='text'
						placeholder='title here'
						value={title}
						onChange={(e) => setTitle(e.currentTarget.value)}
					/>
				) : (
					<>{title}</>
				)}{" "}
			</h1>
			<p>
				{editing ? (
					<textarea
						ref={descriptionRef}
						placeholder='description here'
						value={description}
						onChange={(e) => setDescription(e.currentTarget.value)}
					></textarea>
				) : (
					<>{description}</>
				)}
			</p>
			<div className='btn-note-wrapper'>
				{editing ? (
					<>
						<button onClick={handlerCancelEdit}>Cancel</button>
						<button onClick={handlerConfirmEdit}>Confirm</button>
					</>
				) : (
					<>
						<button onClick={handlerEditNote}>
							<img src='images/icons/edit.ico' />
						</button>
						<button onClick={() => handleDeleteNote(id!)}>
							<img src='images/icons/delete.ico' />
						</button>
					</>
				)}
			</div>
		</div>
	)
}

export default Note
