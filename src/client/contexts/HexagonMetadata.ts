// Modules
import { createContext, ReactNode, Ref } from "react";

export type HexagonMetadataContext = {
	onClick: (row: number, column: number) => void;
	cellIsClickable: (row: number, column: number) => boolean;
	cellContent: (row: number, column: number) => ReactNode | null;
	cellClassNames: (row: number, column: number) => string | string[] | null;
	cellRef: (row: number, column: number) => Ref<HTMLDivElement> | null;
};
export const HexagonMetadata = createContext<HexagonMetadataContext>({
	onClick: () => {},
	cellIsClickable: () => false,
	cellContent: () => null,
	cellClassNames: () => null,
	cellRef: () => null
});
