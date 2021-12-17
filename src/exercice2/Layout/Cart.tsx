import * as React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import CartItem from "../components/CartItem";
import { Container } from "../components/styledComponent";
import { addToCart, toSubtract } from "../reducers/cart";
import type { AppDispatch, RootState } from "../reducers/store";

// I know that this component render everything each time a change is made
// one cause is that I didn't use React.useCallback for fcts that are passed as props
// the second cause is that he have an object as props and comparing an object with the same object (but different refference)
// will always gives false so It will re render
//
export default function Cart() {
	// we need this in order to get the unitPrice and Image of each Item
	const productsItems: any = useSelector<RootState>(
		(state) => state.products,
		shallowEqual
	);
	const cartItems: any = useSelector<RootState>(
		(state) => state.cart,
		shallowEqual
	);
	const dispatch = useDispatch<AppDispatch>();

	const getItem = (itemId: string) => {
		return productsItems.filter((item: any) => item.id === itemId)[0];
	};
	const addButton = (itemId: string) => {
		dispatch(
			addToCart({
				itemToAdd: { id: itemId, price: getItem(itemId).price },
				quantityToAdd: 1,
			})
		);
	};

	const onSubtract = (itemId: string) => {
		dispatch(
			toSubtract({
				itemToSub: { id: itemId, price: getItem(itemId).price },
				quantityToSub: 1,
			})
		);
	};
	if (!(cartItems.items.length > 0)) {
		return <></>;
	}
	return (
		<Container direction="column" style={{ backgroundColor: "AliceBlue" }}>
			<h2>Cart</h2>
			{cartItems.items.map((item: any) => (
				<CartItem
					key={item.itemId}
					product={{
						...item,
						name: getItem(item.itemId).name,
						image: getItem(item.itemId).image,
					}}
					onAddButton={() => addButton(item.itemId)}
					onSubtractButton={() => onSubtract(item.itemId)}
				/>
			))}
			<Container direction="column" style={{ marginLeft: "auto" }}>
				<div>
					<h3 style={{ color: "gray" }}>Subtotal</h3>
					<h3>£ {cartItems.subtotal.toFixed(2)}</h3>
				</div>
				<div>
					<h3 style={{ color: "gray" }}>Discount</h3>
					<h3>£ {cartItems.discount.toFixed(2)}</h3>
				</div>
				<div>
					<h3 style={{ color: "gray" }}>Total</h3>
					<h3>£ {cartItems.total.toFixed(2)}</h3>
				</div>
			</Container>
		</Container>
	);
}
