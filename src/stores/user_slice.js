import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { isUserExist, readDatabase, writeDatabase } from "../lib/firebase";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		loading: false,
		errorMessage: "",
	},
	reducers: {
		setNullCurrentUser: (state) => {
			state.currentUser = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				console.log("masuk: ", action);

				state.loading = false;
				state.currentUser = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				console.log(action, "====");
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});

		builder
			.addCase(register.pending, (state) => {
				state.loading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.currentUser = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				console.log("reject");
				state.loading = false;
				console.log(action, "====");
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});
	},
});

export const login = createAsyncThunk("user/login", async (data, { rejectWithValue }) => {
	try {
		const response = await readDatabase("/users");

		const users = await isUserExist(response, data);

		return users;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const register = createAsyncThunk("user/register", async (data, { rejectWithValue }) => {
	try {
		const res = await writeDatabase("/users", data);

		return res;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const { setNullCurrentUser } = userSlice.actions;
export default userSlice.reducer;
