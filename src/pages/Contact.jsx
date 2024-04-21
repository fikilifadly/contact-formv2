import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact, getContactById, getContacts, setNullCurrentContact, updateContact } from "../stores/contact_slice";
import { convertImageToBase64, convertString, isProfileExist, removeModalHandler, showModalHandler } from "../utils";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

const contactField = [
	["firstName", "text"],
	["lastName", "text"],
	["age", "number"],
	["photo", "file"],
];

const Contact = () => {
	const { contacts, loading, loadingId, currentContact } = useSelector((state) => state.contact);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getContacts());
	}, [dispatch]);

	const submitModalHandler = (e) => {
		e.preventDefault();

		const [firstName, lastName, age, photo] = e.target;

		console.log(photo, photo.value, photo.files[0]);

		let data = {
			firstName: firstName.value,
			lastName: lastName.value,
			age: +age.value,
		};

		if (photo.files[0]) {
			if (photo.files[0].type.includes("png") || photo.files[0].type.includes("jpg")) {
				convertImageToBase64(photo.files[0]).then((res) => {
					data.photo = res;
				});
			} else {
				removeModalHandler();
				return toast.error("Photo must be png or jpg");
			}
		}

		if (!currentContact) {
			console.log("masuk");

			dispatch(addContact(data)).then(() => {
				removeModalHandler();
				dispatch(getContacts());
			});
		} else {
			(data.id = currentContact.id),
				dispatch(updateContact(data)).then(() => {
					removeModalHandler();
					dispatch(getContacts());
				});
		}
	};

	const addHandler = () => {
		dispatch(setNullCurrentContact());
		showModalHandler();
	};

	const getDataByIdHandler = (id) => {
		console.log(id, "hndler ====");
		dispatch(getContactById(id));
	};

	const deleteHandler = () => {
		dispatch(deleteContact(currentContact.id)).then((res) => {
			if (res.payload) {
				removeModalHandler();
				dispatch(getContacts());
			}
		});
	};

	return (
		<div>
			<div className="flex justify-between">
				<h2 className="text-4xl font-bold text-green-600">Contacts</h2>
				<button className="btn bg-green-700 px-10 py-2 text-white" onClick={addHandler}>
					Add Contact
				</button>
			</div>
			<Table fields={contactField} data={contacts} loading={loading} getDataByIdHandler={getDataByIdHandler} idModal={"deleteContact"} />
			<Modal title="Contact Form">
				<form className="flex flex-col" onSubmit={submitModalHandler}>
					{contactField.map((el, i) => {
						return (
							<div className={`${el[1] !== "file" ? "py-2" : "flex justify-between items-center py-2"}`} key={i}>
								<label htmlFor={el[0]}>{convertString(el[0])}</label>

								{loadingId ? (
									<span className="loading loading-spinner"></span>
								) : (
									<div className="flex gap-2">
										<input
											type={el[1]}
											placeholder={`Enter ${el[0]}`}
											defaultValue={loadingId ? "" : el[1] === "file" ? "" : currentContact?.[el[0]]}
											className={`${el[1] === "file" ? "file-input file-input-bordered  max-w-xs self-center" : "mt-1 input input-bordered input-warning w-full"}`}
											name={el[0]}
										/>

										{el[1] === "file" && currentContact?.photo && (
											<div className="flex flex-col gap-2 items-center">
												<span className="text-xs">Previous Photo</span>
												<img src={isProfileExist(currentContact?.photo)} alt={currentContact?.photo} className="w-14 h-14 rounded-md" />
											</div>
										)}
									</div>
								)}
							</div>
						);
					})}
					<button className="btn text-md bg-green-500 text-white my-3 rounded-full" disabled={loading}>
						{loading ? <span className="loading loading-spinner"></span> : "Submit"}
					</button>
				</form>
			</Modal>

			<Modal id="deleteContact">
				<div className="getflex flex-col gap-5">
					<p className="block">
						Are you sure want to delete <span className="font-bold">{currentContact?.firstName}</span> <span className="text-red-500"></span>?
					</p>
					<div className="flex justify-end gap-2">
						<button className="btn bg-red-500 text-white" onClick={deleteHandler}>
							Yes
						</button>
						<button className="btn bg-green-500 text-white" onClick={removeModalHandler}>
							No
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Contact;
