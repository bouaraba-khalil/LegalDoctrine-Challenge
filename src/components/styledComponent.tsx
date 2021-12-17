import * as React from "react";
import styled from "styled-components";

export const Center = styled.div`
	display: grid;
	place-content: center;
	font-size: 42px;
	font-weight: 900;
	color: darkgray;
	text-shadow: 1px 1px 1px darkgray;
	height: 90%;
`;

const Link = styled.p`
	&::before {
		content: "< ";
		margin-left: 10px;
	}
	color: lightgray;
	font-size: 24px;
	font-weight: 500;
	text-decoration: none;
	transition: color 0.6s;

	&:hover {
		color: gray;
		transition: color 0.4s;
	}
`;
export const CustomLink = React.memo(Link);
