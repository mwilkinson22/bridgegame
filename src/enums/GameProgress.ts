export enum GameProgressArrayContents {
	rightAnswer,
	wrongAnswer,
	eliminatedAnswer,
	eliminatorCell,
	startCell
}

export type GameProgressEntry = {
	row: number;
	column: number;
	cellType: GameProgressArrayContents;
};

export type GameProgress = GameProgressEntry[];
