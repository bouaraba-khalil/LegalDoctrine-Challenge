import * as React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ItemCard from "./components/ItemCard";
import { items, rules } from "./data";
import Cart from "./components/Cart";
export default function Exercice2() {
	return (
		<Provider store={store}>
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				width="200"
				height="200"
			>
				<defs>
					<linearGradient id="half_grad">
						<stop offset="50%" stop-color="yellow" />
						<stop offset="50%" stop-color="grey" stop-opacity="1" />
					</linearGradient>
				</defs>
				<path
					d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,
             31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,
             12.118l11.547-1.2L16.026,0.6L20.388,10.918z"
					fill="url(#half_grad)"
					stroke-width="1"
					stroke="red"
				/>
			</svg>
			<div style={{ display: "flex" }}>
				<div style={{ position: "relative" }}>
					<h1>Products</h1>
					{items.map((item) => (
						<ItemCard
							key={item.name}
							title={item.name}
							image={item.image}
							variant="products"
							rating={item.rating}
							price={item.price}
							description={item.description}
						/>
					))}
				</div>
				<Cart />
			</div>
		</Provider>
	);
}
