// Modules
import React from "react";
import { PageContainer } from "~/client/components/layout/PageContainer";

export function Header() {
	return (
		<header>
			<PageContainer>
				<div className="hamburger-menu">
					<div />
					<div />
					<div />
				</div>
				<h1>Header</h1>
				<div className="info-box">ⓘ</div>
			</PageContainer>
		</header>
	);
}
