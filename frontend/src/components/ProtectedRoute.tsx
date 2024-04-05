import { PropsWithChildren } from "react"
import useAuth from "../hooks/useauth"
import { Navigate } from "react-router-dom"

type ProtectedRouteProps = PropsWithChildren

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { authenticated, loading } = useAuth()

	if (loading) {
		return <h1>Loading...</h1>
	}

	if (!authenticated) {
		return <Navigate to={'/login'} replace={true} />
	}

	return children
}

export default ProtectedRoute
