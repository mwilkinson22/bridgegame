// Takes a row number (and the total amount of rows) and determines the first, last and total columns.
export function getColumnInfoByRow(row: number, totalRows: number) {
	const first = Math.abs(row - Math.floor(totalRows / 2));
	const total = Math.ceil(totalRows / 2) - first;
	const last = first + (total - 1) * 2;
	return { first, last, total };
}

export const getMiddleRow = (totalRows: number) => Math.floor(totalRows / 2);

export const getAdjacentSpaces = (row: number, column: number, totalRows: number): [number, number][] => {
	// Get all possible spaces
	const spaces: [number, number][] = [
		// Same Row, Either Side
		[row, column - 2],
		[row, column + 2],

		// Previous Row
		[row - 1, column - 1],
		[row - 1, column + 1],

		// Next
		[row + 1, column - 1],
		[row + 1, column + 1]
	];

	return spaces.filter(([row, column]) => checkSpaceExists(row, column, totalRows));
};

function checkSpaceExists(row: number, column: number, totalRows: number): boolean {
	// Check Row Exists
	if (row < 0 || row >= totalRows) {
		return false;
	}

	// Otherwise check for a valid column
	const columnInfo = getColumnInfoByRow(row, totalRows);
	return column >= columnInfo.first && column <= columnInfo.last && column % 2 === columnInfo.first % 2;
}
