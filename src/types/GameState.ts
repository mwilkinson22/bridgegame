import { GameBoardCellWithState } from "~/types/GameBoardCell";

export type GameState = {
	board: GameBoardCellWithState[];
	points: number;
};
