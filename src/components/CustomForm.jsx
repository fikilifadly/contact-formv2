import CustomInput from "./CustomInput";
import LoginRegisLink from "./LoginRegisLink";

const CustomForm = ({ onSubmitHandler, inputFields, type, loading }) => {
	return (
		<form onSubmit={onSubmitHandler}>
			{inputFields.map((input, i) => (
				<div className="w-full mt-4" key={i}>
					<CustomInput type={input.type} name={input.name} placeholder={input.placeholder} label={input.label} />
				</div>
			))}

			<div className="flex items-center justify-center mt-4">
				<button className="btn bg-green-600 text-white px-10 text-center justify-center" disabled={loading}>
					{loading ? <span className="loading loading-spinner loading-md"></span> : "submit"}
				</button>
			</div>

			{type && <LoginRegisLink name={type} />}
		</form>
	);
};

export default CustomForm;
