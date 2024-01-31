export type GameBoardCell = {
	value: string;
	isWrong: boolean;
	row: number;
	column: number;
};

export type GameBoardCellWithState = GameBoardCell & {
	isVisible: boolean;
	isEliminator: boolean;
	isStart: boolean;
	isEnd: boolean;
	hasBeenClicked: boolean;
	hasBeenEliminated: boolean;
};
