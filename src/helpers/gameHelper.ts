// Modules
import { Game } from "~/models/Game";

// Helpers
import { getColumnInfoByRow, getMiddleRow } from "~/helpers/gridHelper";

// Types
import { PartialWithRequired } from "~/types/UtilityTypes";
import { GameBoardCellWithState } from "~/types/GameBoardCell";

export function initialisePlayableGameBoardWithState(game: Game): GameBoardCellWithState[] {
	const { totalRows } = game;
	const createCell = (data: PartialWithRequired<GameBoardCellWithState, "row" | "column">): GameBoardCellWithState => {
		return {
			isWrong: false,
			isEliminator: false,
			isStart: false,
			isEnd: false,
			isVisible: false,
			hasBeenClicked: false,
			hasBeenEliminated: false,
			value: "",
			...data
		};
	};

	const board = game.board.map(cell => createCell({ ...cell }));

	// Determine our middle column
	const middleColumn = getColumnInfoByRow(0, totalRows).first;

	// Create our "Eliminator" cells
	const middleRow = getMiddleRow(totalRows);
	const { first: firstColumn, last: lastColumn } = getColumnInfoByRow(middleRow, totalRows);
	const eliminatorTemplate = createCell({ row: middleRow, column: -1, isEliminator: true, value: "🗲" });

	board.push(
		// Add a "Start" cell
		createCell({
			isStart: true,
			isVisible: true,
			value: "Start",
			row: 0,
			column: middleColumn
		}),
		// Add an "End" cell
		createCell({
			isEnd: true,
			isVisible: true,
			value: "Finish",
			row: totalRows - 1,
			column: middleColumn
		}),

		// Add Eliminator Cells
		{ ...eliminatorTemplate, column: firstColumn },
		{ ...eliminatorTemplate, column: lastColumn }
	);

	return board;
}

export function findCellInBoard(board: GameBoardCellWithState[], row: number, column: number): GameBoardCellWithState {
	// TODO Replace this with "find" once I've scrapped decorators and re-enabled ES2015 support.
	return board.filter(cell => cell.row === row && cell.column === column)[0];
}

export const cellIsClickable = (cell: GameBoardCellWithState): boolean => cell.isVisible && !cell.hasBeenClicked && !cell.hasBeenEliminated && !cell.isEnd;

export const cellIsSpecial = (cell: GameBoardCellWithState): boolean => cell.isStart || cell.isEnd || cell.isEliminator;
