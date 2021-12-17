import * as React from "react";
import { Container, Image } from "./styledComponent";

type props = {
	product: {
		name: string;
		image: string;
		quantity: number;
		price: number;
		priceWithDiscounts: number;
	};
	onAddButton?: () => void;
	onSubtractButton?: () => void;
};
function CartItem({ product, onAddButton, onSubtractButton }: props) {
	const isPriceReducer = product.price !== product.priceWithDiscounts;
	return (
		<Container
			style={{
				width: 450,
				marginBottom: 10,
				padding: 10,
				borderBottom: "1px solid gray",
			}}
		>
			<Image
				src={product.image}
				alt={product.name}
				height={100}
				width={150}
				style={{ borderRadius: "50%", border: "2px solid gray" }}
			/>
			<Container
				direction="column"
				style={{ width: "100%", margin: "0px 10px" }}
			>
				<Container>
					<h3 style={{ marginRight: "auto" }}>{product.name}</h3>
				</Container>
				<Container>
					<h3
						style={{
							marginLeft: "auto",
							color: isPriceReducer ? "red" : "black",
							textDecoration: isPriceReducer ? "line-through" : "none",
						}}
					>
						£ {product.price.toFixed(2)}
					</h3>
				</Container>
				<Container style={{ alignItems: "center", gap: 10 }}>
					<h3>quantity</h3>
					<button
						style={{
							backgroundColor: "transparent",
							borderRadius: "50%",
							border: "1px solid black",
							width: 30,
							height: 30,
						}}
						onClick={onSubtractButton}
					>
						-
					</button>
					<h3>{product.quantity}</h3>
					<button
						style={{
							backgroundColor: "transparent",
							borderRadius: "50%",
							border: "1px solid black",
							width: 30,
							height: 30,
						}}
						onClick={onAddButton}
					>
						+
					</button>
					<h3
						style={{
							marginLeft: "auto",
							display: isPriceReducer ? "block" : "none",
						}}
					>
						£ {product.priceWithDiscounts.toFixed(2)}
					</h3>
				</Container>
			</Container>
		</Container>
	);
}

export default React.memo(CartItem);
