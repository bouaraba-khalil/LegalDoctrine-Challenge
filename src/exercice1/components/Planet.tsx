import * as React from "react";
import { maxPosition, obstacles } from "../Page";
import { Box, Row } from "./styledComponent";

type planetProps = {
	x: number;
	y: number;
};
const Planet = ({ x, y }: planetProps) => {
	const [board] = React.useState(() =>
		Array.from({ length: y }, (value, index) =>
			Array.from({ length: x }, (value, index) => null)
		)
	);
	const thisBlockIsAnObstacle: (x: number, y: number) => boolean = (x, y) =>
		obstacles.some((obs) => obs.x === x && obs.y === y);
	return (
		<div style={{ position: "relative" }}>
			<div>
				{board.map((row, indexRow) => (
					<Row key={indexRow}>
						{row.map((cell, index) => (
							<Box
								key={index}
								style={{
									backgroundColor: thisBlockIsAnObstacle(
										index,
										maxPosition.y - 1 - indexRow
									)
										? "black"
										: "transparent",
								}}
							/>
						))}
					</Row>
				))}
			</div>
		</div>
	);
};

export default React.memo(Planet);
