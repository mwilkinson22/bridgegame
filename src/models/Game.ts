// Types
import { GameBoardCell } from "~/types/GameBoardCell";
import { createModelFromSchemaObject, createSchemaFromObject } from "~/helpers/modelHelper";
import { Types } from "mongoose";

export interface Game {
	date: Date;
	title: string;
	description: string;
	rightAnswerDescription: string;
	wrongAnswerDescription: string;
	board: GameBoardCell[];
	totalRows: number;
}

export interface IGame {
	date: Date;
	title: string;
	description: string;
	rightAnswerDescription: string;
	wrongAnswerDescription: string;
	board: Types.Array<GameBoardCell>;
	totalRows: number;
}

export const BoardModel = createSchemaFromObject<GameBoardCell>({
	value: { type: String },
	isWrong: { type: Boolean },
	row: { type: Number },
	column: { type: Number }
});

export const GameModel = createModelFromSchemaObject<IGame>("games", {
	date: { type: Date, require: true },
	title: { type: String, require: true },
	description: { type: String, require: true },
	rightAnswerDescription: { type: String, require: true },

	wrongAnswerDescription: { type: String, require: true },

	board: { type: [BoardModel] },

	totalRows: { type: Number, require: true }
});

const newGame = new GameModel({ date: new Date() });
newGame.board.push("foo");
