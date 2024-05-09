// Modules
import React from "react";

// Components
import { PageContainer } from "~/client/components/layout/PageContainer";

// Constants
import { META_CONSTANTS } from "~/config/constants";

export function Header() {
	return (
		<header>
			<PageContainer>
				<div className="hamburger-menu">
					<div />
					<div />
					<div />
				</div>
				<h1>{META_CONSTANTS.APP_TITLE}</h1>
				<div className="info-box">ⓘ</div>
			</PageContainer>
		</header>
	);
}
