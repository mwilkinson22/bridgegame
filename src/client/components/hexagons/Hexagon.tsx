// Modules
import React, { ReactNode, useContext } from "react";

// Models & Types
import { GridContext } from "~/client/contexts/GridContext";
type Props = {
	row: number;
	column: number;
	cellContent?: ReactNode;
};

export function Hexagon(props: Props) {
	const gridContext = useContext(GridContext);

	return (
		<div className={"hexagon"}>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184.751 184.751">
				<path
					d="M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z"
					onClick={() => gridContext.onHexagonClick(props.row, props.column)}
				/>
			</svg>
			<div className="hexagon-content">{props.cellContent}</div>
		</div>
	);
}
