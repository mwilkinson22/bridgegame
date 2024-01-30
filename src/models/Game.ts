// TODO
// Turn this into a mongoose schema

type BoardCell = {
	value: string;
	isLie: boolean;
};

export type Game = {
	date: Date;
	category: string;
	board: BoardCell[];
};
