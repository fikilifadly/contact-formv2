import { configureStore } from "@reduxjs/toolkit";
import contact_slice from "./contact_slice";
import user_slice from "./user_slice";

export const store = configureStore({
	reducer: {
		contact: contact_slice,
		user: user_slice,
	},
});
