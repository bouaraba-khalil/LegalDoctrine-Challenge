import * as React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ProductItem from "../components/ProductItem";
import { loadData } from "../reducers/product";
import { addToCart } from "../reducers/cart";
import type { AppDispatch, RootState } from "../reducers/store";

export default function Products() {
	// I don't know why items type is unknown, I tried to solve it but it just didn't work.
	const items: any = useSelector<RootState>(
		(state) => state.products,
		shallowEqual
	);
	const dispatch = useDispatch<AppDispatch>();

	React.useEffect(() => {
		dispatch(loadData());
	}, [dispatch]);

	const addToCartButton = (item: any) => {
		console.log("lick");
		dispatch(
			addToCart({
				itemToAdd: { id: item.id, price: item.price },
				quantityToAdd: 1,
			})
		);
	};

	return (
		<div>
			<h2>Products</h2>
			<div>
				{items.map((item: any) => (
					<ProductItem
						key={item.id}
						product={item}
						onClick={() => addToCartButton(item)}
					/>
				))}
			</div>
		</div>
	);
}
