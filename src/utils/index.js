import axios from "axios";

export const axiosContact = axios.create({
	baseURL: "https://contact.herokuapp.com/contact",
	headers: {
		"content-type": "application/json",
	},
});

export const showModalHandler = (id) => {
	if (id) {
		document.getElementById(id).showModal();
	} else {
		document.getElementById("mainmodal").showModal();
	}
};

export const removeModalHandler = () => {
	document.querySelector("dialog[open]").querySelector("form").submit();
};

export const dateFormat = (date) => {
	date = new Date(date);
	date = date.toISOString().split("T")[0];
	return date;
};

export const progressComplete = (data) => {
	let count = 0;
	for (const task of data) {
		if (task.progress == "complete") {
			count++;
		}
	}

	if (count > 0) {
		return (data / count) * 100;
	}

	return count;
};
