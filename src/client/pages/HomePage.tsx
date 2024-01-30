// Modules
import React from "react";

// Components
import { PageContainer } from "~/client/components/layout/PageContainer";
import { DailyGameWrapper } from "~/client/components/dailygame/DailyGameWrapper";

export function HomePage() {
	return (
		<PageContainer isMainPage={true}>
			<DailyGameWrapper />
		</PageContainer>
	);
}
