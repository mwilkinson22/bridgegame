// Modules
import React from "react";
import { RouterProvider, createBrowserRouter, RouteObject } from "react-router-dom";

// Pages
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AdminPage } from "./pages/AdminPage";

// Components
import { Header } from "./components/layout/Header";

export function App() {
	const routes: RouteObject[] = [
		{
			path: "/admin",
			element: <AdminPage />
		},
		{
			path: "/",
			element: <HomePage />
		},
		{
			path: "*",
			element: <NotFoundPage />
		}
	];
	const router = createBrowserRouter(routes);
	return (
		<React.StrictMode>
			<Header />
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}
