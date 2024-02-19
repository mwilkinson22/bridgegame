import { IConfigKeys } from "~/config/index";

declare const process: {
	env: {
		MONGO_URI: string;
		COOKIE_KEY: string;
		NODE_ENV: "development" | "production";
		PORT?: string;
		PWD: string;
	};
};

const config: IConfigKeys = {
	cookieKey: process.env.COOKIE_KEY,
	mongoURI: process.env.MONGO_URI
};

export default config;
