import * as React from "react";
import styled from "styled-components";
import { decrement, addToCart } from "../reducers/cart";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";

type props = cartProps | productsProps;

// I can add a props for custom css but since we only have 2 variant there is no need for it
type cartProps = {
	title: string;
	image: string;
	variant: "cart";
	quantity: number;
	totalPrice: number;
	priceWithDiscounts: number | null;
};

type productsProps = {
	title: string;
	image: string;
	variant: "products";
	rating: number;
	price: number;
	description: string;
};

function Item(props: props) {
	if (props.variant === "cart") {
		return <CartItem {...props} />;
	} else if (props.variant === "products") {
		return <ProductsItem {...props} />;
	} else {
		if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
			// throw error in development
			throw new Error(`component: ItemCard, Bad value for the props variant"`);
		} else {
			// return nothing in production (we can make something as default when we use bad value)
			return <></>;
		}
	}
}

function CartItem({
	title,
	image,
	quantity,
	totalPrice,
	priceWithDiscounts,
}: cartProps) {
	return (
		<Container>
			<Image alt={title} src={image} />
			<Container direction="column">
				<Container>
					<h3>{title}</h3> <div>start</div>
				</Container>
				<p>quantity</p>
			</Container>
		</Container>
	);
}

function ProductsItem({
	title,
	image,
	rating,
	price,
	description,
}: productsProps) {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<Container
			style={{
				padding: 10,
				border: 0,
				borderRadius: 10,
				margin: 10,
				width: 500,
				gap: 20,
				boxShadow: "1px 1px 2px 2px rgba(0,0,0,0.3)",
			}}
		>
			<Image alt={title} src={image} height={100} />
			<Container direction="column">
				<Container>
					<Title>{title}</Title>
					<div>{rating}</div>
				</Container>
				<Container style={{ gap: 20 }}>
					<Description>{description}</Description>
					<Price>{price}</Price>
				</Container>
				<Button
					onClick={() => {
						dispatch(addToCart({ itemId: title, quantity: 1 }));
					}}
				>
					add to cart
				</Button>
			</Container>
		</Container>
	);
}

type containerProps = {
	direction?: "column" | "row";
};
const Container = styled.div`
	display: flex;
	flex-direction: ${({ direction }: containerProps) => direction ?? "row"};
`;
const Image = styled.img`
	object-fit: cover;
	aspect-ratio: 5/3;
`;
const Button = styled.button`
	width: fit-content;
	padding: 4px 40px;
	border: 0;
	border-radius: 4px;
	background-color: DeepSkyBlue;
	color: white;
	margin-left: auto;
`;
const Price = styled.p`
	font-weight: bold;
	&::before {
		content: "£";
	}
`;
const Description = styled.p`
	color: #5f5959;
`;
const Title = styled.h3`
	margin-right: auto;
`;
// I just used this because you told me to optimize rendering time as much as possible
// but memorization should be used only when we have performance issue
const ItemCard = React.memo(Item);
export default ItemCard;
