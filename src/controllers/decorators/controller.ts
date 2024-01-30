import "reflect-metadata";
import { AppRouter } from "~/AppRouter";
import { Methods } from "../enums/Methods";
import { MetadataKeys } from "../enums/MetadataKeys";
import { Response } from "express";

export function controller(routePrefix: string) {
	return function(target: Record<string, any>) {
		const router = AppRouter.getInstance();

		for (const key in target.prototype) {
			const routeHandler = target.prototype[key];
			const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
			const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
			const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];

			const errorWrappedRouteHandler = async (...args: any) => {
				// prettier-ignore
				try {
					await routeHandler(...args);
				} catch (e: any) {
					const res: Response = args[1];
					console.error(e);
					res.status(500).send({ toLog: `Uncaught Error: ${e.toString()}` });
				}
			};
			if (path) {
				router[method](`${routePrefix}${path}`, ...middlewares, errorWrappedRouteHandler);
			}
		}
	};
}
