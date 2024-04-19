import React from "react";
import { NavLink } from "react-router-dom";

const NavigationLinks = React.memo(function NavigationLinks({ data }) {
	return (
		<ul className="text-white flex flex-col gap-1">
			{data.map(({ name, path }, index) => (
				<li key={index}>
					<NavLink
						to={path}
						className={({ isActive }) => (isActive ? "flex gap-3 py-2 px-3 items-center bg-green-500 rounded-lg text-white" : "flex gap-3 py-2 px-3 items-center")}
					>
						<span className="text-md">{name}</span>
					</NavLink>
				</li>
			))}
		</ul>
	);
});

export default NavigationLinks;
