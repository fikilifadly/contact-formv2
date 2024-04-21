import { useDispatch } from "react-redux";
import { login } from "../stores/user_slice";
import CustomForm from "../components/CustomForm";

const loginFields = [
	{ type: "email", name: "email", placeholder: "Email Address" },
	{ type: "password", name: "password" },
];
const Login = () => {
	const dispatch = useDispatch();
	// const navigate = useNavigate();

	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(login({ email: e.target.email.value, password: e.target.password.value }));
	};

	return (
		<>
			<h1 className="mt-3 text-2xl font-medium text-center text-gray-600 dark:text-gray-200">Login</h1>

			<CustomForm onSubmitHandler={onSubmitHandler} inputFields={loginFields} type={"register"} />
		</>
	);
};

export default Login;
