import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../stores/user_slice";
import { useDispatch } from "react-redux";
import CustomForm from "../components/CustomForm";

const inputFields = [
	{
		type: "text",
		name: "username",
		placeholder: "Username",
		label: "Username",
	},
	{
		type: "email",
		name: "email",
		placeholder: "Email Address",
		label: "Email Address",
	},
	{
		type: "password",
		name: "password",
		placeholder: "Password",
		label: "Password",
	},
	{
		type: "password",
		name: "repassword",
	},
];

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const [username, email, password, _, repassword] = e.target;

		const isMatched = password.value === repassword.value;
		if (!isMatched) {
			return toast.error("Password not matched");
		}

		const data = {
			username: username.value,
			email: email.value,
			password: password.value,
		};

		dispatch(register(data)).then(() => {
			navigate("/login");
		});
	};

	return (
		<>
			<h1 className="mt-3 text-2xl font-medium text-center text-gray-600 dark:text-gray-200">Register</h1>

			<CustomForm onSubmitHandler={onSubmitHandler} inputFields={inputFields} type={"login"} />
		</>
	);
};

export default Register;
