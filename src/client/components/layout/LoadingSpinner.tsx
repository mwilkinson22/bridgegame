import React from "react";
import { HexagonalGrid } from "~/client/components/hexagons/HexagonalGrid";

export const LoadingSpinner = () => (
	<div className="loading-spinner">
		<HexagonalGrid totalRows={4} />
	</div>
);
