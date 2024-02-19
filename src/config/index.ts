export interface IConfigKeys {
	cookieKey: string;
	mongoURI: string;
}

export default process.env.NODE_ENV === "production" ? require("./prod").default : require("./dev").default;
