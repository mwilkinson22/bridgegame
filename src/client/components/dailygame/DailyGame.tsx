// Modules
import React, { useEffect, useState } from "react";
import axios from "axios";

// Models
import { Game } from "~/models/Game";

// Components
import { LoadingSpinner } from "~/client/components/layout/LoadingSpinner";
import { PlayableGame } from "~/client/components/gameboard/PlayableGame";

export function DailyGame() {
	const [dailyGame, setDailyGame] = useState<Game>();

	useEffect(() => {
		axios.get<Game>("/api/games/daily").then(response => {
			setDailyGame(response.data);
		});
	}, []);

	return dailyGame ? <PlayableGame game={dailyGame} /> : <LoadingSpinner />;
}
