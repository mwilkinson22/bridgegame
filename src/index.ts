// Modules
import express, { Request, Response } from "express";
import mongoose from "mongoose";

// Get Config
import config from "./config";
const { mongoURI } = config;

// Set up Mongoose
mongoose.connect(mongoURI).then(() => {});

// Set up express app
import { AppRouter } from "./AppRouter";
const app = express();

// Set up routing
import "./controllers";
app.use(AppRouter.getInstance());

app.all("/api*", (req: Request, res: Response) => {
	res.status(404).send("404 - Invalid API path");
});

// Enable Static Files
app.use(express.static("dist/public"));

// Homepage
import BasePage from "~/client/pages/BasePage";
app.get("*", (req: Request, res: Response) => res.send(BasePage));

// Start App
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.info(`App is running on Port ${PORT}`);
