import { createSlice } from "@reduxjs/toolkit";
import { items as dataSchema, rules } from "../data";

export type cart = {
	items: {
		itemId: string;
		quantity: number;
		price: number;
		priceWithDiscounts: number;
	}[];
	subtotal: number;
	discount: number;
	total: number;
};

const initialState: cart = {
	items: [],
	subtotal: 0,
	discount: 0,
	total: 0,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const {
				payload: { quantity, itemId },
			} = action;
			// this is just to not mutate state multiple time
			// we will mutate state at the end
			let data = { ...state };
			// let's see if it already existe in our state
			const alreadyExiste = data.items.some((item) => item.itemId === itemId);
			if (alreadyExiste) {
				data.items = data.items.map((item) => {
					if (item.itemId === itemId) {
						return { ...item, quantity: item.quantity + quantity };
					}
					return item;
				});
			} else {
				data.items = [
					...data.items,
					{ itemId, quantity, price: 0, priceWithDiscounts: 0 },
				];
			}
			// now we will calculate regular price
			data.items = data.items.map((item) => {
				const unitPrice = dataSchema.filter(
					(schema) => schema.name === item.itemId
				)[0].price;
				return { ...item, price: unitPrice * item.quantity };
			});
			// then we will calculate discount
			rules.forEach((rule) => {
				// number of time that the condition is satisfied
				let nbrTimeMet = Infinity;
				rule.condition.forEach((condition) => {
					const ele = data.items.filter(
						(item) =>
							item.itemId === condition.item &&
							item.quantity >= condition.quantity
					);
					if (ele.length > 0 && nbrTimeMet !== 0) {
						const times = Math.floor(ele[0].quantity / condition.quantity);
						nbrTimeMet = times > nbrTimeMet ? nbrTimeMet : times;
					} else {
						nbrTimeMet = 0;
					}
				});
				if (nbrTimeMet) {
					rule.discountsOn.forEach((element) => {
						// we see if the element exist in our data to apply discount
						const ele = data.items.filter(
							(item) => item.itemId === element.item
						);
						if (ele.length > 0) {
							const unitPrice = dataSchema.filter(
								(schema) => schema.name === ele[0].itemId
							)[0].price;
							let priceWithDiscounts = ele[0].price;
							nbrTimeMet =
								nbrTimeMet > ele[0].quantity ? ele[0].quantity : nbrTimeMet;
							for (let i = 0; i < nbrTimeMet; i++) {
								priceWithDiscounts =
									priceWithDiscounts - unitPrice * element.discountValue;
							}
							data.items = data.items.map((item) =>
								item.itemId === element.item
									? { ...item, priceWithDiscounts }
									: { ...item }
							);
						} else {
							// do nothing
						}
					});
				}
			});
			// we will calculate total price
			let total = 0;
			data.items.forEach((item) => {
				total += item.price;
			});
			data.subtotal = total;

			// calculate total discount
			let totalDiscount = 0;
			data.items.forEach((item) => {
				totalDiscount =
					item.priceWithDiscounts !== 0
						? totalDiscount + item.price - item.priceWithDiscounts
						: totalDiscount;
			});
			data.discount = totalDiscount;
			data.total = total - totalDiscount;
			return data;
		},
		decrement: (state, action) => {
			const {
				payload: { quantity, itemId },
			} = action;
			let data = { ...state };
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToCart, decrement } = cartSlice.actions;

export default cartSlice.reducer;
