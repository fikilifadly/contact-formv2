import NavigationLinks from "./NavigationLinks";
import { useMemo } from "react";

const SideBar = () => {
	const navigationLinks = useMemo(
		() => [
			{ name: "Home", path: "/" },
			{ name: "Contacts", path: "/contact" },
		],
		[]
	);

	return (
		<div className="sticky top-0  w-full md:w-[25%] flex flex-col justify-between">
			<nav className="p-5 flex flex-col justify-between gap-3 bg-[#101828]">
				<div className="flex items-center">
					<h1 className="text-3xl text-green-500">Contactt List</h1>
				</div>
				<NavigationLinks data={navigationLinks} />
			</nav>
		</div>
	);
};

export default SideBar;
