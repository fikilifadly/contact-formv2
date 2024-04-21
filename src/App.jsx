import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./layouts/Dashboard";
import Auth from "./layouts/Auth";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App() {
	const { currentUser } = useSelector((state) => state.user);

	return (
		<Routes>
			<Route path="/" element={currentUser ? <Dashboard /> : <Navigate to="/login" />}>
				<Route index element={<Home />} />
				<Route path="/contact" element={<Contact />} />
			</Route>
			<Route element={<Auth />}>
				<Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
				<Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
