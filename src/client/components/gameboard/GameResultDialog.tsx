// Modules
import React from "react";

// Components
import { Dialog, DialogDestroyFunction } from "~/client/components/dialogs/Dialog";

// Types
import { GameState } from "~/enums/GameState";
import { GameProgress } from "~/enums/GameProgress";
import { convertProgressToEmoji } from "~/helpers/gameHelper";

type Props = {
	gameState: GameState;
	points: number;
	lives: number;
	progressArray: GameProgress;
	onDestroy: DialogDestroyFunction;
};

export const GameResultDialog = (props: Props) => {
	return (
		<Dialog className="game-result-dialog" title={props.gameState === GameState.Won ? "Victory!" : "Bad Luck!"} onDestroy={props.onDestroy}>
			<div className="game-result-summary">
				<label>Total Points</label>
				<span>{props.points}</span>
				<label>Lives Lost</label>
				<span>{3 - props.lives}/3</span>
				<label>Progress</label>
				<span>{convertProgressToEmoji(props.progressArray, props.gameState)}</span>
			</div>
			{/* TODO share to socials */}
		</Dialog>
	);
};
