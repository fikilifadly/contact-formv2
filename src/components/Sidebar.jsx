import { useDispatch } from "react-redux";
import NavigationLinks from "./NavigationLinks";
import { useMemo } from "react";
import { setNullCurrentUser } from "../stores/user_slice";

const SideBar = () => {
	const dispatch = useDispatch();
	const navigationLinks = useMemo(
		() => [
			{ name: "Home", path: "/" },
			{ name: "Contacts", path: "/contact" },
		],
		[]
	);

	const logOutHandler = () => {
		localStorage.removeItem("token");
		dispatch(setNullCurrentUser());
	};

	return (
		<div className="sticky top-0  w-full md:w-[25%] flex flex-col justify-between">
			<nav className="p-5 flex flex-col justify-between gap-3 bg-[#101828] h-full">
				<div className="h-full">
					<div className="flex items-center mb-5">
						<h1 className="text-3xl text-green-500">Contact List</h1>
					</div>
					<NavigationLinks data={navigationLinks} />
				</div>
				<button className={"p-5 flex gap-3 py-2 px-3 items-center text-green-500 bg-white rounded-md mb-2 font-bold"} onClick={logOutHandler}>
					Log Out
				</button>
			</nav>
		</div>
	);
};

export default SideBar;
