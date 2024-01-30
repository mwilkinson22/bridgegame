// Modules
import React, { ReactNode } from "react";

// Components
import { HexagonalGrid } from "~/client/components/hexagons/HexagonalGrid";

// Models & Types
import { Game } from "~/models/Game";
type Props = {
	game: Game;
};

export function GameBoard(props: Props) {
	const gridContent: ReactNode[] = ["Start", ...props.game.board.map(cell => cell.value), "End"];
	return (
		<div className="game-board">
			<HexagonalGrid totalRows={props.game.rows} gridContent={gridContent} />
		</div>
	);
}
