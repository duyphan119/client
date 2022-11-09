import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState: {
		items: [],
		count: 0,
		itemsLimit: [],
	},
	reducers: {
		setWishListLimit: (state, action) => {
			state.itemsLimit = action.payload.items;
			state.count = action.payload.count;
		},
		setWishList: (state, action) => {
			state.items = action.payload.items;
			state.count = action.payload.count;
		},
		addToWishlist: (state, action) => {
			state.items = [action.payload, ...state.items.filter((item) => item.id !== action.payload.id)];
			state.itemsLimit = [action.payload, ...state.itemsLimit.filter((item) => item.id !== action.payload.id)];
			state.count = state.count + 1;
		},
		deleteWishlistItem: (state, action) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
			state.itemsLimit = state.itemsLimit.filter((item) => item.id !== action.payload);
			state.count = state.count - 1;
		},
	},
});
export const wishlistSelector = (state) => state.wishlist;
export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice.reducer;
