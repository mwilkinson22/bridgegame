type CellClicked = {
	type: "CellClicked";
	row: number;
	column: number;
};

export type GameBoardActions = CellClicked;
