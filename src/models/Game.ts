// TODO
// Turn this into a mongoose schema
import { GameBoardCell } from "~/types/GameBoardCell";

export type Game = {
	date: Date;
	title: string;
	description: string;
	rightAnswerDescription: string;
	wrongAnswerDescription: string;
	board: GameBoardCell[];
	totalRows: number;
};
