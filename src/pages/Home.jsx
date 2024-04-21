import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getContacts } from "../stores/contact_slice";
import Card from "../components/Card";

const Home = () => {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getContacts());
	}, [dispatch]);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col justify-between">
				<h2 className="text-3xl font-bold">Welcome Back, {currentUser}</h2>
				<p className="text-gray-500">Track, manage your contact list</p>
			</div>
			<Card title="Summary of Contacts" />
		</div>
	);
};

export default Home;
