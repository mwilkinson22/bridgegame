// Modules
import React from "react";

// Components
import { Dialog, DialogDestroyFunction } from "~/client/components/dialogs/Dialog";

// Types
import { Game } from "~/models/Game";
type Props = {
	game: Game;
	onDestroy: DialogDestroyFunction;
};

export const GameSummaryDialog = ({ game, onDestroy }: Props) => {
	return (
		<Dialog className="game-summary-dialog" title={game.title} onDestroy={onDestroy}>
			{game.description}
			<div className="right-and-wrong-wrapper">
				<div className="right-wrapper">
					<div className="right-answer-header">Right Answers</div>
					{game.rightAnswerDescription}
				</div>
				<div className="wrong-wrapper">
					<div className="wrong-answer-header">Wrong Answers</div>
					{game.wrongAnswerDescription}
				</div>
			</div>
		</Dialog>
	);
};
