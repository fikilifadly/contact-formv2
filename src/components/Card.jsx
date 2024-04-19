import { useSelector } from "react-redux";

const Card = ({ title }) => {
	const { contacts, loading } = useSelector((state) => state.contact);
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
			<div className="flex flex-col justify-between p-5 shadow-[0px_6px_24px_0px_rgba(0,0,0,0.05),0px_0px_0px_1.5px_rgba(0,0,0,0.08)] rounded-md">
				<div className="flex justify-between">
					<span>{title}</span>
				</div>

				<div className="mt-5">
					{loading ? (
						<span className="loading loading-spinner loading-md"></span>
					) : (
						<div className="flex justify-center items-center">
							<div className="flex gap-4">
								<span className="text-lg font-bold text-red-600">Childs: {contacts.filter((el) => el.age <= 17).length}</span>
								<span className="text-lg font-bold text-green-600">Adults: {contacts.filter((el) => el.age <= 40 && el.age > 17).length}</span>
								<span className="text-lg font-bold text-blue-600">Legal: {contacts.filter((el) => el.age > 40).length}</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
