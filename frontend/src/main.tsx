import React from "react"
import ReactDOM from "react-dom/client"
import GlobalStyle from "./styles/global.ts"
import { RouterProvider } from "react-router-dom"
import router from "./routes/router.tsx"
import AuthProvider from "./providers/authprovider.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<GlobalStyle />
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
)
