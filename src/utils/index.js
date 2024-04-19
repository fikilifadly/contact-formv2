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

export const convertImageToBase64 = (imageFile) => {
	const reader = new FileReader();
	reader.readAsDataURL(imageFile);

	return new Promise((resolve) => {
		reader.onload = (event) => resolve(event.target.result);
	});
};

export const convertString = (str) => {
	const chars = [...str];

	let convertedString = "";

	for (const char of chars) {
		if (chars.indexOf(char) === 0) {
			convertedString += char.toUpperCase();
		} else if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
			convertedString += " " + char;
		} else {
			convertedString += char;
		}
	}

	return convertedString;
};
