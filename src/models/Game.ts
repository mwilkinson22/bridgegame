// TODO
// Turn this into a mongoose schema
import { GameBoardCell } from "~/types/GameBoardCell";

export type Game = {
	date: Date;
	category: string;
	board: GameBoardCell[];
	rows: number;
};
