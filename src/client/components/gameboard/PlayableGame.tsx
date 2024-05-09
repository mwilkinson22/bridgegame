// Modules
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// Components
import { GameBoard } from "./GameBoard";
import { GameSummaryDialog } from "~/client/components/gameboard/GameSummaryDialog";
import { GameResultDialog } from "~/client/components/gameboard/GameResultDialog";

// Constants
import { GAMEPLAY_CONSTANTS } from "~/config/constants";

// Context
import { HexagonMetadata, HexagonMetadataContext } from "~/client/contexts/HexagonMetadata";

// Helpers
import { cellIsClickable, cellIsSpecial, findCellInBoard, gameHasBeenWon, initialisePlayableGameState, revealCellNeighbours } from "~/helpers/gameHelper";

// Models & Types
import { Game } from "~/models/Game";
import { GameState } from "~/enums/GameState";
import { LivesCounter } from "~/client/components/gameboard/LivesCounter";
import { PointsCounter } from "~/client/components/gameboard/PointsCounter";
import { GameProgress, GameProgressArrayContents } from "~/enums/GameProgress";

type Props = {
	game: Game;
	initialProgress?: GameProgress;
};

export function PlayableGame({ game, initialProgress }: Props) {
	const [points, setPoints] = useState(0);
	const [lives, setLives] = useState(GAMEPLAY_CONSTANTS.INITIAL_LIVES);
	const [progressArray, setProgressArray] = useState<GameProgress>(initialProgress ?? []);
	const [board, setBoard] = useState(initialisePlayableGameState(game, progressArray));
	const [gameState, setGameState] = useState(GameState.InProgress);
	const [showGameSummary, setShowGameSummary] = useState(false); // TODO Set to true by default - but not during early development!
	const [showGameResults, setShowGameResults] = useState(false);
	const [showGameResultLink, setShowGameResultLink] = useState(false);

	const handleCellClick = (row: number, column: number) => {
		const cell = findCellInBoard(board, row, column);
		cell.hasBeenClicked = true;

		// Set Points
		if (!cellIsSpecial(cell)) {
			setProgressArray(prevState => [
				...prevState,
				{
					row,
					column,
					cellType: cell.isWrong ? GameProgressArrayContents.wrongAnswer : GameProgressArrayContents.rightAnswer
				}
			]);
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
			setProgressArray(prevState => [
				...prevState,
				{
					row,
					column,
					cellType: GameProgressArrayContents.eliminatorCell
				},
				{
					row: lie.row,
					column: lie.column,
					cellType: GameProgressArrayContents.eliminatedAnswer
				}
			]);
		}

		// Make Adjacent Cells Visible
		revealCellNeighbours(cell, board, game.totalRows);

		if (cell.isStart) {
			setProgressArray(prevState => [
				...prevState,
				{
					row,
					column,
					cellType: GameProgressArrayContents.startCell
				}
			]);
		}

		setBoard([...board]);
	};

	// Set Lives
	useEffect(() => {
		const lostLives = board.filter(cell => cell.isWrong && cell.hasBeenClicked).length;
		setLives(GAMEPLAY_CONSTANTS.INITIAL_LIVES - lostLives);
	}, [board]);

	// Set Points
	useEffect(() => {
		let points = 0;
		progressArray.forEach(({ cellType }) => {
			switch (cellType) {
				case GameProgressArrayContents.rightAnswer:
					points += GAMEPLAY_CONSTANTS.CORRECT_ANSWER_POINTS;
					break;
				case GameProgressArrayContents.wrongAnswer:
					points = points * GAMEPLAY_CONSTANTS.INCORRECT_ANSWER_POINTS_MULTIPLIER;
					break;
			}
		});

		setPoints(points);
	}, [board]);

	// Set the Game State
	useEffect(() => {
		// Check for a loss.
		if (lives < 1) {
			setGameState(GameState.Lost);
		} else if (gameHasBeenWon(board, game.totalRows)) {
			setGameState(GameState.Won);
		}
	}, [board, lives]);

	// Conditionally show the Game Results Dialog
	useEffect(() => {
		const gameComplete = gameState !== GameState.InProgress;
		if (gameComplete) {
			// If we load a game that's been previously completed, we don't want to show the summary on render.
			setShowGameSummary(false);

			// Allow a quick delay before showing the dialog.
			setTimeout(() => setShowGameResults(true), 2000);
		}
	}, [gameState]);

	// Center-scroll the Start cell
	const startCellRef = useRef(document.createElement("div"));
	useLayoutEffect(() => {
		startCellRef.current.scrollIntoView({ inline: "center" });
	}, []);

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
		},
		cellRef: (row, column) => {
			const cell = findCellInBoard(board, row, column);
			if (cell.isStart) {
				return startCellRef;
			}
			return null;
		}
	};

	let gameSummaryDialog;
	if (showGameSummary) {
		gameSummaryDialog = <GameSummaryDialog game={game} onDestroy={() => setShowGameSummary(false)} />;
	}

	let gameResultsDialog;
	if (showGameResults) {
		gameResultsDialog = (
			<GameResultDialog
				gameState={gameState}
				lives={lives}
				points={points}
				progressArray={progressArray}
				board={board}
				onDestroy={() => {
					setShowGameResults(false);
					setShowGameResultLink(true);
				}}
			/>
		);
	}

	let viewResultsLink;
	if (showGameResultLink) {
		viewResultsLink = (
			<div className="game-view-results-link" onClick={() => setShowGameResults(true)}>
				View Results
			</div>
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
					{viewResultsLink}
				</div>
				<GameBoard game={game} />
				{gameSummaryDialog}
				{gameResultsDialog}
			</div>
		</HexagonMetadata.Provider>
	);
}
