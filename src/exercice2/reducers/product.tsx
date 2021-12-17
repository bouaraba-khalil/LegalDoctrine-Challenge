import { createSlice } from "@reduxjs/toolkit";
import { items } from "../data";

// this is just to have a single source of truth since I already create a schema for my data I will just use it
// another solution is to create a type in my data then import it here
const initialState: typeof items = [];
export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		loadData: (state) => {
			// something like http request here 😊
			return [...items];
		},
	},
});

export const { loadData } = productsSlice.actions;

export default productsSlice.reducer;
