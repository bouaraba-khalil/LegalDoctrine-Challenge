import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import productsReducer from "./product";

const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer,
	},
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
