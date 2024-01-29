// React
import React from "react";
import { createRoot } from "react-dom/client";

// Polyfills
import "@babel/polyfill";
import { polyfill } from "es6-promise";
polyfill();

// Main App
import { App } from "./App";
const root = createRoot(document.getElementById("root")!);
root.render(<App />);
