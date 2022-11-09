import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		accessToken: localStorage.getItem("AT") || "",
	},
	reducers: {
		register: (state, action) => {
			state.user = action.payload.account;
			state.accessToken = action.payload.accessToken;
			localStorage.setItem("AT", state.accessToken);
		},
		login: (state, action) => {
			state.user = action.payload.account;
			state.accessToken = action.payload.accessToken;
			localStorage.setItem("AT", state.accessToken);
		},
		logout: (state) => {
			state.user = null;
			state.accessToken = "";
			localStorage.setItem("AT", state.accessToken);
		},
		setProfile: (state, action) => {
			state.user = action.payload;
		},
		refreshToken: (state, action) => {
			state.accessToken = action.payload;
			localStorage.setItem("AT", state.accessToken);
		},
	},
});
export const authSelector = (state) => state.auth;
export const authActions = authSlice.actions;
export default authSlice.reducer;
