import { configureStore } from "@reduxjs/toolkit";
import contact_slice from "./contact_slice";

export const store = configureStore({
	reducer: {
		contact: contact_slice,
	},
});
