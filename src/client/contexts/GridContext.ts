import { createContext } from "react";
export type GridContextType = {
	onHexagonClick: (row: number, column: number) => void;
};

export const GridContext = createContext<GridContextType>({ onHexagonClick: () => {} });
