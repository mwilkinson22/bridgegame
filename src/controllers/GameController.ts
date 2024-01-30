//Modules
import { Request, Response } from "express";

//Decorators
import { controller, get } from "./decorators";

//Models
import { Game } from "~/models/Game";

//Controller
@controller("/api/games")
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class GameController {
	@get("/daily")
	async dailyGame(req: Request, res: Response) {
		// A temporary dummy game
		const game: Game = {
			date: new Date(),
			category: "Hello",
			rows: 11,
			board: [
				{ isLie: false, value: "Truth 1-0" },
				{ isLie: true, value: "Lie 1-1" },
				{ isLie: false, value: "Truth 2-0" },
				{ isLie: true, value: "Lie 2-1" },
				{ isLie: false, value: "Truth 2-2" },
				{ isLie: false, value: "Truth 3-0" },
				{ isLie: false, value: "Truth 3-1" },
				{ isLie: true, value: "Lie 3-2" },
				{ isLie: false, value: "Truth 3-3" },
				{ isLie: true, value: "Lie 4-0" },
				{ isLie: false, value: "Truth 4-1" },
				{ isLie: false, value: "Truth 4-2" },
				{ isLie: true, value: "Lie 4-3" },
				{ isLie: false, value: "Truth 4-4" },
				{ isLie: false, value: "Truth 5-0" },
				{ isLie: false, value: "Truth 5-1" },
				{ isLie: false, value: "Truth 5-2" },
				{ isLie: false, value: "Truth 5-3" },
				{ isLie: true, value: "Lie 5-4" },
				{ isLie: false, value: "Truth 5-5" },
				{ isLie: false, value: "Truth 6-0" },
				{ isLie: false, value: "Truth 6-1" },
				{ isLie: true, value: "Lie 6-2" },
				{ isLie: false, value: "Truth 6-3" },
				{ isLie: false, value: "Truth 6-4" },
				{ isLie: false, value: "Truth 7-0" },
				{ isLie: false, value: "Truth 7-1" },
				{ isLie: false, value: "Truth 7-2" },
				{ isLie: true, value: "Lie 7-3" },
				{ isLie: false, value: "Truth 8-0" },
				{ isLie: true, value: "Lie 8-1" },
				{ isLie: false, value: "Truth 8-2" },
				{ isLie: true, value: "Lie 9-0" },
				{ isLie: false, value: "Truth 9-1" }
			]
		};
		res.send(game);
	}
}
