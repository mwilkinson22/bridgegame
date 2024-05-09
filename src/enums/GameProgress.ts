export enum GameProgressArrayContents {
	rightAnswer,
	wrongAnswer,
	eliminatedAnswer,
	eliminatorCell
}

export type GameProgressEntry = {
	row: number;
	column: number;
	cellType: GameProgressArrayContents;
};

export type GameProgress = GameProgressEntry[];
