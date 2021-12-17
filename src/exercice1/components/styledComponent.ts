import styled from "styled-components";

export const Row = styled.div`
	width: fit-content;
	height: 41px;
	border: 1px solid darkgray;
	border-bottom: 0;
	&:last-of-type {
		border-bottom: 1px solid darkgray;
	}
`;

export const Box = styled.div`
	display: inline-block;
	width: 40px;
	height: 40px;
	border-right: 1px solid darkgray;
	padding: 10px;
	&:last-of-type {
		border-right: 0;
	}
`;
export const ShipContainer = styled.div`
	position: absolute;
	transform: translateX(calc(var(--x) * 40))
		translateY(calc(-41px - var(--y) * 41)) rotate(var(--angle));
`;

export const GrayBox = styled.div`
	text-align: center;
	padding: 5px 20px;
	background-color: lightgray;
	font-size: 18px;
	font-weight: bold;
	width: fit-content;
	margin: 10px auto;
`;
