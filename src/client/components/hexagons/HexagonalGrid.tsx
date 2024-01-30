import React from "react";
import { Hexagon } from "~/client/components/hexagons/Hexagon";

function getColumnInfoByRow(row: number, totalRows: number) {
	const first = Math.abs(row - Math.floor(totalRows / 2));
	const total = Math.ceil(totalRows / 2) - first;
	const last = first + (total - 1) * 2;
	return { first, last, total };
}
type Props = {
	totalRows: number;
};
export function HexagonalGrid({ totalRows }: Props) {
	const results = [];

	for (let row = 0; row < totalRows; row++) {
		const { first, last, total } = getColumnInfoByRow(row, totalRows);
		if (total) {
			const hexes = [];
			for (let column = first; column <= last; column += 2) {
				hexes.push(<Hexagon row={row} column={column} key={`${column}-${row}`} />);
			}

			results.push(
				<div className="hexagonal-grid-row" key={row}>
					{hexes}
				</div>
			);
		}
	}
	return results;
}
