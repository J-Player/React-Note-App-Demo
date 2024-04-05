import React, { useRef, useState } from "react"
import styled from "styled-components"
import { Color } from "../styles/palette"
import useAuth from "../hooks/useauth"
import { useNavigate } from "react-router-dom"

const LoginContainer = styled.div`
	display: grid;
	place-items: center;
	align-items: center;
	background-color: #eee;
	min-height: 100vh;
	& > div {
		background-color: #fff;
		border-radius: 1rem;
		display: grid;
		grid-template-rows: 0.5fr 1fr;
		width: 100%;
		height: 100%;
		max-height: 500px;
		max-width: 500px;
		place-items: center;
		overflow: hidden;
		box-shadow: 0 3px 5px rgba(0, 0, 0, 0.25);
		.title-wrapper {
			display: grid;
			place-items: center;
			background-color: ${Color.bg_primary};
			height: 100%;
			width: 100%;
			font-size: 20pt;
			color: ${Color.text_primary};
			text-transform: uppercase;
			font-weight: bold;
		}
		.form-wrapper {
			display: flex;
			flex-direction: column;
			padding: 4rem;
			gap: 1rem;
			width: 100%;

			form {
				display: inherit;
				flex-direction: inherit;
				gap: inherit;
				width: 100%;
			}

			input {
				font-size: 1.6rem;
				padding: 1.5rem;
				outline: none;
				border: none;
				background-color: #eee;
				width: 100%;
				&[type="submit"] {
					background-color: ${Color.bg_primary};
					cursor: pointer;
					color: #eee;
				}
			}

			span,
			button {
				font-size: 1.6rem;
				background-color: transparent;
				border: none;
				outline: none;
				color: ${Color.text_secundary};
			}
			span button {
				color: ${Color.text_highlight};
				cursor: pointer;
			}
		}
	}
`

const Login = () => {
	const [formType, setFormType] = useState<"login" | "register">("login")
	const userRef = useRef<HTMLInputElement>(null)
	const passRef = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
	const { handleLogin, handleRegister, loading } = useAuth()

	const toggleForm = () => {
		setFormType((prev) => (prev == "login" ? "register" : "login"))
	}

	const handlerSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const username = userRef.current!.value
		const password = passRef.current!.value
		if (formType === "login") {
			handleLogin(username, password).then((res) => {
				if (res.status === 200) navigate("/", { replace: true })
				else alert(res.data)
			})
		} else {
			const res = await handleRegister(username, password)
			if (res.status === 201) {
				alert('User created successfully.')
				toggleForm()
			} else {
				alert('Algo deu errado...')
			}
		}
	}

	return (
		<LoginContainer>
			<div>
				<div className='title-wrapper'>
					<h1>Note App</h1>
				</div>
				<div className='form-wrapper'>
					<form action='' onSubmit={handlerSubmit}>
						<input ref={userRef} type='text' name='' id='username' placeholder='Username' />
						<input ref={passRef} type='password' name='' id='password' placeholder='Password' />
						<input type='submit' value={formType.toUpperCase()} disabled={loading} />
					</form>
					<span>
						{formType === "login" ? (
							<>
								Don't have an account?{" "}
								<button onClick={toggleForm} disabled={loading}>
									Register
								</button>
								.
							</>
						) : (
							<>
								Do have an account? <button onClick={toggleForm}>Login</button>.
							</>
						)}
					</span>
				</div>
			</div>
		</LoginContainer>
	)
}

export default Login
