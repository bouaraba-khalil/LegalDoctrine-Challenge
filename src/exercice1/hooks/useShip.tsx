import * as React from "react";
import { obstacles } from "../Page";
type props = { maxPos: { x: number; y: number } };

export function useShip({ maxPos }: props) {
	const [position, setPosition] = React.useState({ x: 0, y: 0 });
	const [direction, setDirection] = React.useState<"N" | "E" | "S" | "W">("N");

	const actions = React.useCallback(
		(event: KeyboardEvent) => {
			const onKeyPress = (key: string) =>
				event.key === key.toLowerCase() || event.key === key.toUpperCase();
			if (onKeyPress("f")) {
				const newPosition = changePosition(
					position,
					maxPos,
					direction,
					"forward"
				)!;
				const didHitAnObstacle = obstacles.some(
					(obs) => obs.x === newPosition.x && obs.y === newPosition.y
				);
				if (didHitAnObstacle) {
					return alert("OBSTACLE !!!!");
				} else {
					setPosition(newPosition);
				}
			} else if (onKeyPress("b")) {
				const newPosition = changePosition(
					position,
					maxPos,
					direction,
					"backward"
				)!;
				const didHitAnObstacle = obstacles.some(
					(obs) => obs.x === newPosition.x && obs.y === newPosition.y
				);
				if (didHitAnObstacle) {
					return alert("OBSTACLE !!!!");
				} else {
					setPosition(newPosition);
				}
			} else if (onKeyPress("r")) {
				setDirection((current) => changeDirection(current, "left"));
			} else if (onKeyPress("l")) {
				setDirection((current) => changeDirection(current, "right"));
			}
		},
		[direction, position, maxPos]
	);

	React.useEffect(() => {
		window.addEventListener("keydown", actions);
		return () => window.removeEventListener("keydown", actions);
	}, [actions]);
	return { position, direction };
}

const changeDirection = (
	direction: "N" | "E" | "S" | "W",
	to: "left" | "right"
) => {
	switch (direction) {
		case "N":
			return to === "left" ? "E" : "W";
		case "E":
			return to === "left" ? "S" : "N";
		case "S":
			return to === "left" ? "W" : "E";
		case "W":
			return to === "left" ? "N" : "S";
		default:
			// in case where we have a wrong direction let's just correct it
			return "N";
	}
};
const changePosition = (
	currentPosition: { x: number; y: number },
	maxPosition: { x: number; y: number },
	direction: "N" | "E" | "S" | "W",
	to: "forward" | "backward"
) => {
	if (to === "forward") {
		switch (direction) {
			case "N":
				if (currentPosition.y + 1 > maxPosition.y - 1) {
					return { x: currentPosition.x, y: 0 };
				}
				return { x: currentPosition.x, y: currentPosition.y + 1 };

			case "E":
				if (currentPosition.x + 1 > maxPosition.x - 1) {
					return { x: 0, y: currentPosition.y };
				}
				return { x: currentPosition.x + 1, y: currentPosition.y };

			case "S":
				if (currentPosition.y - 1 < 0) {
					return { x: currentPosition.x, y: maxPosition.y - 1 };
				}
				return { x: currentPosition.x, y: currentPosition.y - 1 };

			case "W":
				if (currentPosition.x - 1 < 0) {
					return { x: maxPosition.x - 1, y: currentPosition.y };
				}
				return { x: currentPosition.x - 1, y: currentPosition.y };
		}
	} else if (to === "backward") {
		switch (direction) {
			case "N":
				if (currentPosition.y - 1 < 0) {
					return { x: currentPosition.x, y: maxPosition.y - 1 };
				}
				return { x: currentPosition.x, y: currentPosition.y - 1 };

			case "E":
				if (currentPosition.x - 1 < 0) {
					return { x: maxPosition.x - 1, y: currentPosition.y };
				}
				return { x: currentPosition.x - 1, y: currentPosition.y };

			case "S":
				if (currentPosition.y + 1 > maxPosition.y - 1) {
					return { x: currentPosition.x, y: 0 };
				}
				return { x: currentPosition.x, y: currentPosition.y + 1 };
			case "W":
				if (currentPosition.x + 1 > maxPosition.x - 1) {
					return { x: 0, y: currentPosition.y };
				}
				return { x: currentPosition.x + 1, y: currentPosition.y };
		}
	}
};
