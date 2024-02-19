// Modules
import React, { useEffect, useState } from "react";

// Components
import { GameBoard } from "./GameBoard";
import { GameSummaryDialog } from "~/client/components/gameboard/GameSummaryDialog";
import { GameResultDialog } from "~/client/components/gameboard/GameResultDialog";

// Context
import { HexagonMetadata, HexagonMetadataContext } from "~/client/contexts/HexagonMetadata";

// Helpers
import { cellIsClickable, cellIsSpecial, findCellInBoard, initialisePlayableGameState } from "~/helpers/gameHelper";
import { getAdjacentSpaces } from "~/helpers/gridHelper";

// Models & Types
import { Game } from "~/models/Game";
import { GameState } from "~/enums/GameState";
import { LivesCounter } from "~/client/components/gameboard/LivesCounter";
import { PointsCounter } from "~/client/components/gameboard/PointsCounter";
import { GameProgressArrayContents } from "~/enums/GameProgressArrayContents";

type Props = {
	game: Game;
};

export function PlayableGame({ game }: Props) {
	const [points, setPoints] = useState(0);
	const [lives, setLives] = useState(3);
	const [board, setBoard] = useState(initialisePlayableGameState(game));
	const [gameState, setGameState] = useState(GameState.InProgress);
	const [showGameSummary, setShowGameSummary] = useState(false); // TODO Set to true by default - but not during early development!
	const [showGameResults, setShowGameResults] = useState(false);
	const [progressArray, setProgressArray] = useState<GameProgressArrayContents[]>([]);

	const handleCellClick = (row: number, column: number) => {
		const cell = findCellInBoard(board, row, column);
		cell.hasBeenClicked = true;

		// Set Points
		if (!cellIsSpecial(cell)) {
			setPoints(Math.round(cell.isWrong ? points / 2 : points + 500));
			setProgressArray(prevState => [...prevState, cell.isWrong ? GameProgressArrayContents.clickedWrong : GameProgressArrayContents.clickedRight]);

			// Reduce Lives
			if (cell.isWrong) {
				const newLives = lives - 1;
				setLives(newLives);
				if (newLives < 1) {
					setGameState(GameState.Lost);
				}
			}
		}

		// Eliminate
		if (cell.isEliminator) {
			// First aim for a visible lie.
			let lies = board.filter(cell => cell.isWrong && cellIsClickable(cell));
			if (!lies.length) {
				// Failing that, get all unclicked lies, minus the one on the final row.
				lies = board.filter(cell => cell.isWrong && !cell.hasBeenEliminated && !cell.hasBeenClicked);
			}

			const lie = lies[Math.floor(Math.random() * lies.length)];
			lie.isVisible = true;
			lie.hasBeenEliminated = true;
			setProgressArray(prevState => [...prevState, GameProgressArrayContents.eliminated]);
		}

		// Make Adjacent Cells Visible
		if (!cell.isWrong) {
			const adjacentCells = getAdjacentSpaces(row, column, game.totalRows).map(([row, column]) => findCellInBoard(board, row, column));
			if (adjacentCells.some(cell => cell.isEnd)) {
				setGameState(GameState.Won);
			} else {
				adjacentCells.forEach(cell => (cell.isVisible = true));
			}
		}

		setBoard([...board]);
	};

	useEffect(() => setShowGameResults(gameState !== GameState.InProgress), [gameState]);

	// Handle Context
	const hexagonMetadata: HexagonMetadataContext = {
		onClick: handleCellClick,
		cellIsClickable: (row, column) => gameState === GameState.InProgress && cellIsClickable(findCellInBoard(board, row, column)),
		cellContent: (row, column) => findCellInBoard(board, row, column).value,
		cellClassNames: (row, column) => {
			const cell = findCellInBoard(board, row, column);
			const isClickable = cellIsClickable(cell);
			const classNames = [];
			if (gameState === GameState.InProgress && isClickable) {
				classNames.push("clickable");
			}

			if (!cell.isVisible && gameState === GameState.InProgress) {
				classNames.push("hidden");
			}

			if (cell.isStart || cell.isEnd) {
				classNames.push("startend");
			} else if (cell.isEliminator) {
				classNames.push("eliminator");
			} else {
				// From here on we're dealing with simple answer cells
				if (cell.hasBeenClicked) {
					classNames.push(cell.isWrong ? "clicked-lie" : "clicked-truth");
				} else if (cell.hasBeenEliminated) {
					classNames.push("eliminated-lie");
				} else if (gameState !== GameState.InProgress) {
					classNames.push(cell.isWrong ? "revealed-lie" : "revealed-truth");
				} else if (isClickable) {
					classNames.push("unknown-answer");
				}
			}

			return classNames;
		}
	};

	let gameSummaryDialog;
	if (showGameSummary) {
		gameSummaryDialog = <GameSummaryDialog game={game} onDestroy={() => setShowGameSummary(false)} />;
	}

	let gameResultsDialog;
	if (showGameResults) {
		gameResultsDialog = (
			<GameResultDialog gameState={gameState} lives={lives} points={points} progressArray={progressArray} onDestroy={() => setShowGameResults(false)} />
		);
	}

	return (
		<HexagonMetadata.Provider value={hexagonMetadata}>
			<div className="playable-game">
				<div className="game-info">
					<LivesCounter lives={lives} />
					<h2
						className="game-title"
						onClick={() => {
							gameState === GameState.InProgress ? setShowGameSummary(true) : setShowGameResults(true);
						}}
					>
						{game.title} ⓘ
					</h2>
					<PointsCounter points={points} />
				</div>
				<GameBoard game={game} />
				{gameSummaryDialog}
				{gameResultsDialog}
			</div>
		</HexagonMetadata.Provider>
	);
}
