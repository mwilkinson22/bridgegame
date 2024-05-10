// Modules
import React, { CSSProperties, useContext } from "react";

// Models & Types
import { HexagonMetadata } from "~/client/contexts/HexagonMetadata";
type Props = {
	row: number;
	column: number;
};

export function Hexagon(props: Props) {
	const { row, column } = props;
	const { onClick, cellIsClickable, cellContent, cellClassNames } = useContext(HexagonMetadata);

	const innerContent = cellContent(row, column);
	const content = innerContent ? <div className="hexagon-content">{innerContent}</div> : null;

	const classNames = ["hexagon"];
	const customClassNames = cellClassNames(row, column);
	if (Array.isArray(customClassNames)) {
		classNames.push(...customClassNames);
	} else if (typeof customClassNames === "string") {
		classNames.push(customClassNames);
	}

	// Create CSS Grid Properties
	const gridProperties: CSSProperties = {
		gridRow: row + 1,
		gridColumn: `${column + 1}/${column + 3}`
	};

	return (
		<div className={classNames.join(" ")} style={gridProperties}>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184.751 184.751" className={"hexagon-svg"}>
				<path
					d="M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z"
					onClick={() => cellIsClickable(row, column) && onClick(row, column)}
				/>
			</svg>
			{content}
		</div>
	);
}
