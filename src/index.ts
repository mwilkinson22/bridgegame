// Modules
import path from "path";
import express, { Request, Response } from "express";

// Set up express app
const app = express();

// Set up routing
import { AppRouter } from "./AppRouter";
app.use(AppRouter.getInstance());
app.use(express.static("dist/public"));

// Homepage
app.get("*", (req: Request, res: Response) => res.sendFile(path.resolve("public", "index.html")));

// Start App
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.info(`App is running on Port ${PORT}`);
