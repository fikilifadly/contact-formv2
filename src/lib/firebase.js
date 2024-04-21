import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { matchUser } from "../utils";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_apiKey,
	authDomain: import.meta.env.VITE_authDomain,
	projectId: import.meta.env.VITE_projectId,
	storageBucket: import.meta.env.VITE_storageBucket,
	messagingSenderId: import.meta.env.VITE_messagingSenderId,
	appId: import.meta.env.VITE_appId,
	databaseURL: import.meta.env.VITE_database_url,
};

export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const writeDatabase = (url, ...data) => {
	const uuid = uuidv4();
	const response = set(ref(db, `${url}/${uuid}`), {
		...data,
	});

	return response;
};

export const readDatabase = async (url) => {
	const readRef = ref(db, url);

	return readRef;
};

export const isUserExist = (res, email, password) => {
	return new Promise((resolve, reject) => {
		onValue(res, (snapshot) => {
			const snapshots = snapshot.val();
			const user = matchUser(snapshots, email, password);
			if (user) {
				resolve(user);
			} else {
				reject();
			}
		});
	});
};
