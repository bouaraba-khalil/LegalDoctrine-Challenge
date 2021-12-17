import { GrayBox } from "./styledComponent";

type infoBoxProps = {
	position: { x: number; y: number };
	direction: "N" | "E" | "W" | "S";
};
export const InfoBox = ({ position, direction }: infoBoxProps) => {
	return (
		<div>
			<h2 style={{ textAlign: "center" }}>Current Position</h2>
			<GrayBox style={{ padding: "5px 50px" }}>
				{position.x},{position.y},{direction}
			</GrayBox>
			<h2 style={{ textAlign: "center" }}>Controls</h2>
			<GrayBox>F</GrayBox>
			<div
				style={{
					display: "flex",
				}}
			>
				<GrayBox>L</GrayBox>
				<GrayBox>B</GrayBox>
				<GrayBox>R</GrayBox>
			</div>
		</div>
	);
};
