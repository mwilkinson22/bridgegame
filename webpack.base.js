const path = require("path");
const isProduction = process.env.NODE_ENV === "production";

const config = {
	mode: isProduction ? "production" : "development",
	entry: "./src/index.tsx",
	module: {
		rules: [
			{
				test: /.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.m?js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					presets: [
						"@babel/preset-react",
						[
							"@babel/preset-env",
							{
								targets: { browsers: ["last 2 versions", "ie >= 11"] }
							}
						]
					]
				}
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"~": path.resolve("./src")
		}
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	}
};

module.exports = config;
