// Modules
import React from "react";

// Components
import { Hexagon } from "~/client/components/hexagons/Hexagon";

// Helpers
import { getColumnInfoByRow } from "~/helpers/gridHelper";

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
