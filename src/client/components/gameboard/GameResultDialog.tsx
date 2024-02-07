// Modules
import React from "react";

// Components
import { Dialog, DialogDestroyFunction } from "~/client/components/dialogs/Dialog";

// Types
import { GameState } from "~/enums/GameState";
import { GameProgressArrayContents } from "~/enums/GameProgressArrayContents";
import { convertProgressArrayToEmoji } from "~/helpers/gameHelper";

type Props = {
	gameState: GameState;
	points: number;
	lives: number;
	progressArray: GameProgressArrayContents[];
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
				<span>{convertProgressArrayToEmoji(props.progressArray)}</span>
			</div>
			{/* TODO share to socials */}
		</Dialog>
	);
};
