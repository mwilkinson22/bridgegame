//Modules
import { Request, Response } from "express";

//Decorators
import { Controller } from "./types/Controller";

//Models
import { Game } from "~/models/Game";

//Controller
const GameController = new Controller("/api/games");

GameController.get(
	"/daily",
	(req: Request, res: Response): Response => {
		// A temporary dummy game
		const game: Game = {
			date: new Date(),
			title: "Right or Wrong",
			description: "This is an example game, which contains right and wrong answers.",
			rightAnswerDescription: "The word 'right'",
			wrongAnswerDescription: "The word 'wrong'. Or anything that's not the word 'right'.",
			totalRows: 11,
			board: [
				{ isWrong: false, row: 1, column: 4, value: "Right" },
				{ isWrong: true, row: 1, column: 6, value: "Wrong" },
				{ isWrong: false, row: 2, column: 3, value: "Right" },
				{ isWrong: true, row: 2, column: 5, value: "Wrong" },
				{ isWrong: false, row: 2, column: 7, value: "Right" },
				{ isWrong: false, row: 3, column: 2, value: "Right" },
				{ isWrong: false, row: 3, column: 4, value: "Right" },
				{ isWrong: true, row: 3, column: 6, value: "Wrong" },
				{ isWrong: false, row: 3, column: 8, value: "Right" },
				{ isWrong: true, row: 4, column: 1, value: "Wrong" },
				{ isWrong: false, row: 4, column: 3, value: "Right" },
				{ isWrong: false, row: 4, column: 5, value: "Right" },
				{ isWrong: true, row: 4, column: 7, value: "Wrong" },
				{ isWrong: false, row: 4, column: 9, value: "Right" },
				{ isWrong: false, row: 5, column: 2, value: "Right" },
				{ isWrong: false, row: 5, column: 4, value: "Right" },
				{ isWrong: false, row: 5, column: 6, value: "Right" },
				{ isWrong: true, row: 5, column: 8, value: "Wrong" },
				{ isWrong: false, row: 6, column: 1, value: "Right" },
				{ isWrong: false, row: 6, column: 3, value: "Right" },
				{ isWrong: true, row: 6, column: 5, value: "Wrong" },
				{ isWrong: false, row: 6, column: 7, value: "Right" },
				{ isWrong: false, row: 6, column: 9, value: "Right" },
				{ isWrong: false, row: 7, column: 2, value: "Right" },
				{ isWrong: false, row: 7, column: 4, value: "Right" },
				{ isWrong: false, row: 7, column: 6, value: "Right" },
				{ isWrong: true, row: 7, column: 8, value: "Wrong" },
				{ isWrong: false, row: 8, column: 3, value: "Right" },
				{ isWrong: true, row: 8, column: 5, value: "Wrong" },
				{ isWrong: false, row: 8, column: 7, value: "Right" },
				{ isWrong: true, row: 9, column: 4, value: "Wrong" },
				{ isWrong: false, row: 9, column: 6, value: "Right" }
			]
		};
		return res.send(game);
	}
);
