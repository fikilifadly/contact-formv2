import InputPassword from "../components/InputPassword";

const CustomInput = ({ type, name, placeholder, label }) => {
	return (
		<div className="w-full mt-4">
			{type === "password" ? (
				<InputPassword name={name} />
			) : (
				<input
					className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
					type={type}
					name={name}
					placeholder={placeholder}
					aria-label={label}
				/>
			)}
		</div>
	);
};

export default CustomInput;
