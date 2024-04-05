import { createContext, PropsWithChildren, useEffect, useState } from "react"
import api from "../api"
import { AxiosResponse } from "axios"

type AuthContextProps = {
	authenticated : boolean
	loading : boolean
	setAuthenticated : React.Dispatch<React.SetStateAction<boolean>>
	setLoading : React.Dispatch<React.SetStateAction<boolean>>
	handleLogin : (username: string, password: string) => Promise<AxiosResponse>
	handleRegister : (username: string, password: string) => Promise<AxiosResponse>
	handleLogout : () => void
} | null

export const AuthContext = createContext<AuthContextProps>(null)

type AuthProviderProps = PropsWithChildren

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authenticated, setAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token) {
			api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
			setAuthenticated(true)
		}
		setLoading(false)
	}, [])

	const handleLogin = async (username: string, password: string) => {
		const response = await api.post("/auth/login", { username: username, password: password })
		localStorage.setItem("token", JSON.stringify(response.data.access_token))
		api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`
		setAuthenticated(true)
		return response
	}

	const handleLogout = () => {
		localStorage.removeItem("token")
		api.defaults.headers.Authorization = null
		setAuthenticated(false)
	}

	const handleRegister = async (username: string, password: string) => {
		const response = await api.post("/auth/register", { username: username, password: password })
		return response
	}

	return (
		<AuthContext.Provider
			value={{ authenticated, loading, handleLogin, handleLogout, handleRegister, setAuthenticated, setLoading }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
