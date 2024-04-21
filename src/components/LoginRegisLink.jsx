import { Link } from "react-router-dom";

const LoginRegisLink = ({ name }) => {
	return (
		<div className="flex justify-center mt-3 text-sm">
			<p>
				{name !== "login" ? "Don't have an account?" : "Already have an account?"}{" "}
				<Link to={`${name === "login" ? "/login" : "/register"}`} className="text-blue-600">
					{name}
				</Link>
			</p>
		</div>
	);
};

export default LoginRegisLink;
