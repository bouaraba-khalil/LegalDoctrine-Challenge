import { createSlice } from "@reduxjs/toolkit";
import { items as dataSchema, rules } from "../data";

// dataSchema is used to get the price of each item  when we wan't to calculate the discount
// I can find a better way to do this
// but for this some code need to be added
// I am trying to get a single source of truth to not have a lot of duplicated data everywhere

type cart = {
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
				payload: { quantityToAdd, itemToAdd },
			} = action;
			// this is just to not mutate state multiple time
			// we will mutate state at the end
			let data = { ...state };

			// if there is no discount the priceWithDiscounts will be equal to price
			const itemAlreadyExiste = data.items.some(
				(item) => item.itemId === itemToAdd.id
			);
			if (itemAlreadyExiste) {
				data.items = data.items.map((item) => {
					if (item.itemId === itemToAdd.id) {
						return {
							...item,
							price: itemToAdd.price * (item.quantity + quantityToAdd),
							priceWithDiscounts:
								itemToAdd.price * (item.quantity + quantityToAdd),
							quantity: item.quantity + quantityToAdd,
						};
					}
					return item;
				});
			} else {
				data.items = [
					...data.items,
					{
						itemId: itemToAdd.id,
						price: itemToAdd.price * quantityToAdd,
						quantity: quantityToAdd,
						priceWithDiscounts: itemToAdd.price * quantityToAdd,
					},
				];
			}

			// now we see if we can apply a discount
			rules.forEach((rule) => {
				// number of time that the condition is satisfied
				let nbrTimeMet = Infinity;
				rule.condition.forEach((condition) => {
					const element = data.items.filter(
						(item) =>
							item.itemId === condition.itemId &&
							item.quantity >= condition.quantity
					);
					if (element.length > 0 && nbrTimeMet !== 0) {
						// negative number can break this condition but we shouldn't have negative quantity so
						const times = Math.floor(element[0].quantity / condition.quantity);
						nbrTimeMet = times > nbrTimeMet ? nbrTimeMet : times;
					} else {
						nbrTimeMet = 0;
					}
				});

				if (nbrTimeMet) {
					rule.discountsOn.forEach((discount) => {
						// we see if the element that we want to apply the discount exist
						const element = data.items.filter(
							(item) => item.itemId === discount.itemId
						);
						if (element.length > 0) {
							const unitPrice = dataSchema.filter(
								(schema) => schema.id === element[0].itemId
							)[0].price;
							const maxNbrOfItem = discount.quantity * nbrTimeMet;
							// nbr of item that we apply the discount to
							const nbrOfItem =
								element[0].quantity > maxNbrOfItem
									? maxNbrOfItem
									: element[0].quantity;
							let priceWithDiscounts = element[0].price;
							for (let i = 0; i < nbrOfItem; i++) {
								priceWithDiscounts =
									priceWithDiscounts - unitPrice * discount.discountValue;
							}
							data.items = data.items.map((item) =>
								item.itemId === discount.itemId
									? { ...item, priceWithDiscounts }
									: { ...item }
							);
						}
					});
				}
			});
			// let's calculate the total price now
			let subtotal = 0;
			let totalDiscount = 0;

			data.items.forEach((item) => {
				subtotal += item.price;
				totalDiscount += item.price - item.priceWithDiscounts;
			});

			data.subtotal = subtotal;
			data.discount = totalDiscount;
			data.total = subtotal - totalDiscount;
			return { ...data };
		},
		toSubtract: (state, action) => {
			const {
				payload: { quantityToSub, itemToSub },
			} = action;
			let data = { ...state };
			const itemAlreadyExiste = data.items.filter(
				(item) => item.itemId === itemToSub.id
			);
			if (itemAlreadyExiste.length > 0) {
				const isItemLeft = itemAlreadyExiste[0].quantity - quantityToSub > 0;
				if (isItemLeft) {
					data.items = data.items.map((item) =>
						item.itemId === itemToSub.id
							? {
									...item,
									quantity: item.quantity - quantityToSub,
									price: itemToSub.price * (item.quantity - quantityToSub),
									priceWithDiscounts:
										itemToSub.price * (item.quantity - quantityToSub),
							  }
							: item
					);
				} else {
					data.items = data.items.filter(
						(item) => item.itemId !== itemToSub.id
					);
				}
				// now we see if we can apply a discount again
				rules.forEach((rule) => {
					// number of time that the condition is satisfied
					let nbrTimeMet = Infinity;
					rule.condition.forEach((condition) => {
						const element = data.items.filter(
							(item) =>
								item.itemId === condition.itemId &&
								item.quantity >= condition.quantity
						);
						if (element.length > 0 && nbrTimeMet !== 0) {
							// negative number can break this condition but we shouldn't have negative quantity so
							const times = Math.floor(
								element[0].quantity / condition.quantity
							);
							nbrTimeMet = times > nbrTimeMet ? nbrTimeMet : times;
						} else {
							nbrTimeMet = 0;
						}
					});

					if (nbrTimeMet) {
						rule.discountsOn.forEach((discount) => {
							// we see if the element that we want to apply the discount exist
							const element = data.items.filter(
								(item) => item.itemId === discount.itemId
							);
							if (element.length > 0) {
								const unitPrice = dataSchema.filter(
									(schema) => schema.id === element[0].itemId
								)[0].price;
								const maxNbrOfItem = discount.quantity * nbrTimeMet;
								// nbr of item that we apply the discount to
								const nbrOfItem =
									element[0].quantity > maxNbrOfItem
										? maxNbrOfItem
										: element[0].quantity;
								let priceWithDiscounts = element[0].price;
								for (let i = 0; i < nbrOfItem; i++) {
									priceWithDiscounts =
										priceWithDiscounts - unitPrice * discount.discountValue;
								}
								data.items = data.items.map((item) =>
									item.itemId === discount.itemId
										? { ...item, priceWithDiscounts }
										: { ...item }
								);
							}
						});
					}
				});
				// let's calculate the total price now
				let subtotal = 0;
				let totalDiscount = 0;

				data.items.forEach((item) => {
					subtotal += item.price;
					totalDiscount += item.price - item.priceWithDiscounts;
				});

				data.subtotal = subtotal;
				data.discount = totalDiscount;
				data.total = subtotal - totalDiscount;
				return { ...data };
			}
		},
	},
});

export const { addToCart, toSubtract } = cartSlice.actions;

export default cartSlice.reducer;
