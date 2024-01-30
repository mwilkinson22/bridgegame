export type GameBoardCell = {
	value: string;
	isLie: boolean;
};

export type GameBoardCellWithState = GameBoardCell & {
	isVisible: boolean;
	isSafety: boolean;
	isStart: boolean;
	isEnd: boolean;
	hasBeenClicked: boolean;
};
