import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

const router = createBrowserRouter([
	{
		element: <Dashboard />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
