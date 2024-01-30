// Takes a row number (and the total amount of rows) and determines the first, last and total columns.
export function getColumnInfoByRow(row: number, totalRows: number) {
	const first = Math.abs(row - Math.floor(totalRows / 2));
	const total = Math.ceil(totalRows / 2) - first;
	const last = first + (total - 1) * 2;
	return { first, last, total };
}
