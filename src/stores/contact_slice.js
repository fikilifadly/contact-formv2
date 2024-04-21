import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosContact } from "../utils";
import { toast } from "react-toastify";

const contactSlice = createSlice({
	name: "contact",
	initialState: {
		contacts: [],
		currentContact: null,
		loading: true,
		loadingId: true,
		errorMessage: "",
	},
	reducers: {
		setNullCurrentContact: (state) => {
			state.loadingId = true;
			state.currentContact = null;
			state.loadingId = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getContacts.pending, (state) => {
				state.loading = true;
			})
			.addCase(getContacts.fulfilled, (state, action) => {
				state.loading = false;
				state.contacts = action.payload;
			})
			.addCase(getContacts.rejected, (state, action) => {
				state.loading = false;
				console.log(action, "====");
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(addContact.pending, (state) => {
				state.loading = true;
			})
			.addCase(addContact.fulfilled, (state, action) => {
				console.log("redux: ", action);

				state.errorMessage = "";
				state.loading = false;
				toast.success(`Success Add ${action.meta.arg.firstName} to Contact List`);
			})
			.addCase(addContact.rejected, (state, action) => {
				console.log(action, "======= r");
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error("Add Contact Failed");
			});

		builder
			.addCase(updateContact.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateContact.fulfilled, (state, action) => {
				console.log(action, "====");

				state.errorMessage = "";
				state.loading = false;
				toast.success(`Success Update ${state.currentContact.firstName}`);
			})
			.addCase(updateContact.rejected, (state, action) => {
				console.log(action, "----");

				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(deleteContact.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				console.log("first -=", action);

				state.errorMessage = "";
				state.loading = false;
				toast.success("Success Delete Contact");
			})
			.addCase(deleteContact.rejected, (state, action) => {
				console.log("reject: ", action);
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error("Delete Contact Failed");
			});

		builder
			.addCase(getContactById.pending, (state) => {
				state.loadingId = true;
			})
			.addCase(getContactById.fulfilled, (state, { payload }) => {
				state.loadingId = false;
				state.currentContact = payload;
			})
			.addCase(getContactById.rejected, (state, action) => {
				state.loadingId = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});
	},
});

export const getContacts = createAsyncThunk("contact/getContacts", async (_, { rejectWithValue }) => {
	try {
		const { data: datas } = await axiosContact({
			method: "GET",
		});

		const { data } = datas;
		return data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const addContact = createAsyncThunk("contact/addContact", async (data, { rejectWithValue }) => {
	try {
		console.log(data, "====");

		const { data: contact } = await axiosContact({
			method: "POST",
			data,
		});
		return contact;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const updateContact = createAsyncThunk("contact/updateContact", async (data, { rejectWithValue }) => {
	try {
		const id = data.id;
		delete data.id;
		data = JSON.stringify(data);

		console.log(data);

		const contact = await axiosContact.put(`/${id}`, data);
		return contact;
	} catch (err) {
		return rejectWithValue(err);
	}
});

export const deleteContact = createAsyncThunk("contact/deleteContact", async (id, { rejectWithValue }) => {
	try {
		const { data: contact } = await axiosContact.delete(`/${id}`);
		return contact;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const getContactById = createAsyncThunk("contact/getContactById", async (id, { rejectWithValue }) => {
	try {
		let { data: contact } = await axiosContact.get(`/${id}`);
		const { data } = contact;

		return data;
	} catch (err) {
		return rejectWithValue(err);
	}
});

export const { setNullCurrentContact } = contactSlice.actions;
export default contactSlice.reducer;
