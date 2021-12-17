import styled from "styled-components";

type containerProps = {
	direction?: "column" | "row";
};
export const Container = styled.div`
	display: flex;
	flex-direction: ${({ direction }: containerProps) => direction ?? "row"};
`;
export const ProductContainer = styled(Container)`
	padding: 10px;
	border-radius: 10px;
	margin: 10px;
	width: 500px;
	box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.3);
`;
export const Button = styled.button`
	width: fit-content;
	padding: 4px 40px;
	border: 0;
	border-radius: 4px;
	background-color: DeepSkyBlue;
	color: white;
	margin-left: auto;
`;
export const Image = styled.img`
	object-fit: cover;
	aspect-ratio: 5/3;
`;
