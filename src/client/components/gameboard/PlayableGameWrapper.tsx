// Modules
import React, { useReducer, useMemo } from "react";

// Components
import { GameBoard } from "./GameBoard";

// Actions
import { GameBoardActions } from "~/client/actions/GameBoardActions";

// Context
import { GridContext, GridContextType } from "~/client/contexts/GridContext";

// Models & Types
import { Game } from "~/models/Game";
import { GameState } from "~/types/GameState";
type Props = {
	game: Game;
};

export function PlayableGameWrapper(props: Props) {
	// Manage Game State.
	function reducer(prevState: GameState, action: GameBoardActions): GameState {
		switch (action.type) {
			case "CellClicked": {
				console.log("Clicked", action.row, action.column);
				return prevState;
			}
			default:
				return prevState;
		}
	}

	const initialState: GameState = useMemo(() => {
		const state = {
			board: [],
			points: 0
		};
		return state;
	}, []);

	const [gameState, dispatchGameState] = useReducer(reducer, initialState);

	// Handle Context
	const gridContext: GridContextType = {
		onHexagonClick: (row, column) => dispatchGameState({ type: "CellClicked", row, column })
	};

	return (
		<GridContext.Provider value={gridContext}>
			<GameBoard game={props.game} />
		</GridContext.Provider>
	);
}
