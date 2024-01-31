// Modules
import React from "react";

// Components
import { HexagonalGrid } from "~/client/components/hexagons/HexagonalGrid";

// Models & Types
import { Game } from "~/models/Game";
type Props = {
	game: Game;
};

export const GameBoard = (props: Props) => (
	<div className="game-board">
		<HexagonalGrid totalRows={props.game.totalRows} />
	</div>
);
