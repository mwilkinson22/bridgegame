// Modules
import { Game } from "~/models/Game";

// Helpers
import { getAdjacentSpaces, getColumnInfoByRow, getMiddleRow } from "~/helpers/gridHelper";

// Types
import { PartialWithRequired } from "~/types/UtilityTypes";
import { GameBoardCell, GameBoardCellWithState } from "~/types/GameBoardCell";
import { GameProgress, GameProgressArrayContents } from "~/enums/GameProgress";
import { GameState } from "~/enums/GameState";

export function initialisePlayableGameState(game: Game, initialProgress: GameProgress): GameBoardCellWithState[] {
	const { totalRows } = game;
	const createCell = (data: PartialWithRequired<GameBoardCellWithState, "row" | "column">): GameBoardCellWithState => {
		const progressEntry = initialProgress.find(({ row, column }) => row === data.row && column === data.column);
		if (progressEntry) {
			data.hasBeenEliminated = progressEntry.cellType === GameProgressArrayContents.eliminatedAnswer;

			// If it's in the progress array and hasn't been eliminated, it has been clicked.
			data.hasBeenClicked = !data.hasBeenEliminated;
		}

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

	// Make the right cells visible
	board.forEach(cell => {
		if (cell.hasBeenClicked && cellRevealsNeighboursOnClick(cell)) {
			revealCellNeighbours(cell, board, game.totalRows);
		}
	});

	return board;
}

export const gameHasBeenWon = (board: GameBoardCellWithState[], totalRows: number): boolean => {
	// Find the "End" cell
	const endCell = board.find(cell => cell.isEnd)!;

	// Get the spaces above it
	const finalAnswerCells = getAdjacentSpaces(endCell.row, endCell.column, totalRows).map(([row, column]) => findCellInBoard(board, row, column));

	return finalAnswerCells.some(cell => !cell.isWrong && cell.hasBeenClicked);
};

export const revealCellNeighbours = (cell: GameBoardCell, board: GameBoardCellWithState[], totalRows: number): void => {
	if (cellRevealsNeighboursOnClick(cell)) {
		const adjacentCells = getAdjacentSpaces(cell.row, cell.column, totalRows).map(([row, column]) => findCellInBoard(board, row, column));
		if (!adjacentCells.some(cell => cell.isEnd)) {
			adjacentCells.forEach(cell => (cell.isVisible = true));
		}
	}
};

export const cellRevealsNeighboursOnClick = (cell: GameBoardCell): boolean => !cell.isWrong;

export const findCellInBoard = (board: GameBoardCellWithState[], row: number, column: number): GameBoardCellWithState =>
	board.find(cell => cell.row === row && cell.column === column) as GameBoardCellWithState;

export const cellIsClickable = (cell: GameBoardCellWithState): boolean => cell.isVisible && !cell.hasBeenClicked && !cell.hasBeenEliminated && !cell.isEnd;

export const cellIsSpecial = (cell: GameBoardCellWithState): boolean => cell.isStart || cell.isEnd || cell.isEliminator;

export const convertProgressToEmoji = (gameProgress: GameProgress, gameState: GameState): string => {
	let result = gameProgress
		.map(progressEntry => {
			switch (progressEntry.cellType) {
				case GameProgressArrayContents.rightAnswer:
					return "🟩";
				case GameProgressArrayContents.wrongAnswer:
					return "🟥";
				case GameProgressArrayContents.eliminatorCell:
					return "🟪";
				default:
					return "";
			}
		})
		.join("");

	switch (gameState) {
		case GameState.Won:
			result += "🎊";
			break;
		case GameState.Lost:
			result += "💀";
			break;
	}

	return result;
};
