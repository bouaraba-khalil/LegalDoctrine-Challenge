import { Box, ShipContainer } from "./styledComponent";

type shipProps = {
	position: { x: number; y: number };
	direction: "N" | "E" | "S" | "W";
};
export const Ship = ({ position, direction }: shipProps) => {
	const angle =
		direction === "N"
			? "-45deg"
			: direction === "E"
			? "45deg"
			: direction === "S"
			? "135deg"
			: direction === "W"
			? "-135deg"
			: "0deg";
	return (
		<ShipContainer
			style={
				{
					"--x": position.x + "px",
					"--y": position.y + "px",
					"--angle": angle,
				} as React.CSSProperties
			}
		>
			<Box>🚀</Box>
		</ShipContainer>
	);
};
