import React from "react";

type Props = {
	row: number;
	column: number;
};
export function Hexagon(props: Props) {
	return (
		<svg className={"hexagon"} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184.751 184.751">
			<path d="M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z" />
		</svg>
	);
}
