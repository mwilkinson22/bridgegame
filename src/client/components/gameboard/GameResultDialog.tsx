// Modules
import React, { Fragment, ReactNode } from "react";

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

	// Calculate Correct Answers
	const totalCorrectAnswersClicked = props.progressArray.filter(({ cellType }) => cellType === GameProgressArrayContents.rightAnswer).length;
	const totalPossibleCorrectAnswers = props.board.filter(cell => !cellIsSpecial(cell) && !cell.isWrong).length;
	const percentageOfCorrectAnswersClicked = parseFloat(((totalCorrectAnswersClicked / totalPossibleCorrectAnswers) * 100).toFixed(2));

	// Get the title
	const perfectGame = percentageOfCorrectAnswersClicked === 100 && props.lives === INITIAL_LIVES;
	let titleText: string[];
	let titleEmoji: string;
	if (perfectGame) {
		titleText = ["Perfection"];
		titleEmoji = "💯";
	} else if (props.gameState === GameState.Won) {
		titleText = ["Victory", "Amazing", "Outstanding", "You Did It", "Awesome"];
		titleEmoji = "🏆";
	} else {
		titleText = ["Bad Luck", "Not Your Day", "Next Time", "Unlucky", "Almost"];
		titleEmoji = "😞";
	}
	const title = `${titleText[new Date().getDate() % titleText.length]}! ${titleEmoji}`;

	// Create our table data
	const tableData: [ReactNode, ReactNode][] = [
		["Correct Answers Found", `${totalCorrectAnswersClicked}/${totalPossibleCorrectAnswers} (${percentageOfCorrectAnswersClicked}%)`],
		["Lives Remaining", `${props.lives}/${INITIAL_LIVES}`],
		["Total Points", props.points + `${perfectGame ? " 🌟" : ""}`],
		["Progress", convertProgressToEmoji(props.progressArray, props.gameState)]
	];

	return (
		<Dialog className="game-result-dialog" title={title} onDestroy={props.onDestroy}>
			<div className="game-result-summary">
				{tableData.map(([label, value], i) => (
					<Fragment key={i}>
						<label>{label}</label>
						<span>{value}</span>
					</Fragment>
				))}
			</div>
			{/* TODO share to socials */}
		</Dialog>
	);
};
