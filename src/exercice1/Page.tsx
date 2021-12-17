import * as React from "react";
import { InfoBox } from "./components/InfoBox";
import Planet from "./components/Planet";
import { Ship } from "./components/Ship";
import { useShip } from "./hooks/useShip";

// the size of the planet here for exemple from 0 to 10
export const maxPosition = { x: 11, y: 11 };
// the bottom left is the starting point where {x:0,y:0}
export const obstacles = [
	{ x: 10, y: 10 },
	{ x: 5, y: 5 },
	{ x: 3, y: 2 },
	{ x: 4, y: 1 },
	{ x: 5, y: 0 },
	// { x: 0, y: 0 },
];
export default function Exercice1() {
	const { position, direction } = useShip({ maxPos: maxPosition });
	return (
		<>
			<h1>Exercice 1</h1>
			<div style={{ display: "flex" }}>
				<div
					style={{
						margin: 30,
						flex: 0,
						minWidth:
							maxPosition.x * 42 /*minWidth is  number of cell * cellWidth  */,
					}}
				>
					<Planet x={maxPosition.x} y={maxPosition.y} />
					<Ship direction={direction} position={position} />
				</div>
				<InfoBox direction={direction} position={position} />
			</div>
		</>
	);
}
