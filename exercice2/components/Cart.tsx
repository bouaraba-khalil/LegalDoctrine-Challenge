import * as React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { decrement, addToCart } from "../reducers/cart";
import { items as data } from "../data";

import type { RootState } from "../store";
import ItemCard from "./ItemCard";

const Cart = () => {
	// je n'ai pas l'habitude d'utilisé redux, j'ai essayer de voir l'integration de typescript avec
	// react-redux mais je pense que je me suis prie de la mauvaise manière
	// donc je le laisse en any pour ne pas trop perdre de temps
	const cart: any = useSelector<RootState>((state) => state.cart);
	return (
		<div>
			<h2>Cart</h2>
			<div>
				{cart.items.map((item: any) => (
					<div>{JSON.stringify(item)}</div>
				))}
			</div>
		</div>
	);
};

export default React.memo(Cart);
