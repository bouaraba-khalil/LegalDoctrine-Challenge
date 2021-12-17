import * as React from "react";
import { Button, Container, ProductContainer, Image } from "./styledComponent";

type props = {
	product: {
		id: string;
		name: string;
		image: string;
		description: string;
		rating: number;
		price: number;
	};
	onClick: () => void;
};

export default function ProductItem({ product, onClick }: props) {
	return (
		<ProductContainer>
			<Image src={product.image} alt={product.name} height={100} />
			<Container direction="column" style={{ margin: "0px 10px" }}>
				<Container>
					<h3 style={{ marginRight: "auto" }}>{product.name}</h3>
					<div>{product.rating}</div>
				</Container>
				<Container style={{ gap: 20 }}>
					<p style={{ color: "#5f5959" }}>{product.description}</p>
					<p
						style={{
							fontWeight: "bold",
							minWidth: "fit-content",
						}}
					>
						£ {product.price.toFixed(2)}
					</p>
				</Container>
				<Button onClick={onClick}>add to cart</Button>
			</Container>
		</ProductContainer>
	);
}
