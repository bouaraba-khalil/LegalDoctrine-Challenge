import * as React from "react";

import { Provider } from "react-redux";
import { Container } from "./components/styledComponent";
import Cart from "./Layout/Cart";
import Products from "./Layout/Products";
import store from "./reducers/store";

// I will suppose that data come from a server so I will load data and store them in my redux state
// and since redux is only used in this exercice so I will use the provider here

// Layout folder contains stateful component
// Component folder contains presentational components 'stateless component'
export default function Exercice2() {
	return (
		<Provider store={store}>
			<Container>
				<Products />
				<Cart />
			</Container>
		</Provider>
	);
}
