import { AppRouter } from "~/AppRouter";
import { RequestHandler } from "express";

export class Controller {
	private router = AppRouter.getInstance();

	constructor(private rootPath: string) {}

	get = (subPath: string, ...callbacks: RequestHandler[]) => this.router.get(this.getFullPath(subPath), ...callbacks);

	private getFullPath = (subPath: string) => this.rootPath + subPath;
}
