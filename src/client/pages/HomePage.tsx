// Modules
import React from "react";

// Components
import { PageContainer } from "~/client/components/layout/PageContainer";
import { DailyGame } from "~/client/components/dailygame/DailyGame";

export function HomePage() {
	return (
		<PageContainer isMainPage={true}>
			<DailyGame />
		</PageContainer>
	);
}
