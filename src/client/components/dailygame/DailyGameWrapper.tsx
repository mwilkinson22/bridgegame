// Modules
import React, { useEffect, useState } from "react";
import axios from "axios";

// Models
import { Game } from "~/models/Game";

// Components
import { LoadingSpinner } from "~/client/components/layout/LoadingSpinner";
import { PlayableGameWrapper } from "~/client/components/gameboard/PlayableGameWrapper";

export function DailyGameWrapper() {
	const [dailyGame, setDailyGame] = useState<Game>();

	useEffect(() => {
		axios.get<Game>("/api/games/daily").then(response => {
			setDailyGame(response.data);
		});
	}, []);

	return dailyGame ? <PlayableGameWrapper game={dailyGame} /> : <LoadingSpinner />;
}
