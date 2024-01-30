// Modules
import path from "path";
import express, { Request, Response } from "express";
import { AppRouter } from "./AppRouter";

// Set up express app
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
app.get("*", (req: Request, res: Response) => res.sendFile(path.resolve("public", "index.html")));

// Start App
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.info(`App is running on Port ${PORT}`);
