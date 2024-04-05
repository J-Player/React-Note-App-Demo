import { useContext } from "react";
import { AuthContext } from "../providers/authprovider";

export default function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('Context error')
	}
	return context
}
