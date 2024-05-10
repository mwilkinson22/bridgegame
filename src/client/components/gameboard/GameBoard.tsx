// Modules
import React from "react";

// Components
import { HexagonalGrid } from "~/client/components/hexagons/HexagonalGrid";

// Models & Types
import { Game } from "~/models/Game";
import { PanAndZoomElement } from "~/client/components/layout/PanAndZoomElement";
type Props = {
	game: Game;
};

export const GameBoard = (props: Props) => {
	return (
		<PanAndZoomElement minScale={0.2} maxScale={3} wrapperClass="game-board-wrapper">
			<div className="game-board">
				<HexagonalGrid totalRows={props.game.totalRows} />
			</div>
		</PanAndZoomElement>
	);
};
