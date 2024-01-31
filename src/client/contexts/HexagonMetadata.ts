// Modules
import { createContext, ReactNode } from "react";

export type HexagonMetadataContext = {
	onClick: (row: number, column: number) => void;
	cellIsClickable: (row: number, column: number) => boolean;
	cellContent: (row: number, column: number) => ReactNode | null;
	cellClassNames: (row: number, column: number) => string | string[] | null;
};
export const HexagonMetadata = createContext<HexagonMetadataContext>({
	onClick: () => {},
	cellIsClickable: () => false,
	cellContent: () => null,
	cellClassNames: () => null
});
