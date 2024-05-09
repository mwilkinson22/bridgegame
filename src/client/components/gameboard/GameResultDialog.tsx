// Modules
import React from "react";

// Components
import { Dialog, DialogDestroyFunction } from "~/client/components/dialogs/Dialog";

// Types
import { GameState } from "~/enums/GameState";
import { GameProgress, GameProgressArrayContents } from "~/enums/GameProgress";
import { cellIsSpecial, convertProgressToEmoji } from "~/helpers/gameHelper";
import { GAMEPLAY_CONSTANTS } from "~/config/constants";
import { GameBoardCellWithState } from "~/types/GameBoardCell";

type Props = {
	gameState: GameState;
	points: number;
	lives: number;
	progressArray: GameProgress;
	board: GameBoardCellWithState[];
	onDestroy: DialogDestroyFunction;
};

export const GameResultDialog = (props: Props) => {
	// Calculate Lives
	const { INITIAL_LIVES } = GAMEPLAY_CONSTANTS;
	const livesRemaining = INITIAL_LIVES - props.lives;

	// Calculate Correct Answers
	const totalCorrectAnswersClicked = props.progressArray.filter(({ cellType }) => cellType === GameProgressArrayContents.rightAnswer).length;
	const totalPossibleCorrectAnswers = props.board.filter(cell => !cellIsSpecial(cell) && !cell.isWrong).length;
	const percentageOfCorrectAnswersClicked = parseFloat(((totalCorrectAnswersClicked / totalPossibleCorrectAnswers) * 100).toFixed(2));

	return (
		<Dialog className="game-result-dialog" title={props.gameState === GameState.Won ? "Victory!" : "Bad Luck!"} onDestroy={props.onDestroy}>
			<div className="game-result-summary">
				<label>Total Points</label>
				<span>{props.points}</span>
				<label>Lives Lost</label>
				<span>
					{livesRemaining}/{INITIAL_LIVES}
				</span>
				<label>Correct Answers Found</label>
				<span>
					{totalCorrectAnswersClicked}/{totalPossibleCorrectAnswers} ({percentageOfCorrectAnswersClicked}%)
				</span>
				<label>Progress</label>
				<span>{convertProgressToEmoji(props.progressArray, props.gameState)}</span>
			</div>
			{/* TODO share to socials */}
		</Dialog>
	);
};
