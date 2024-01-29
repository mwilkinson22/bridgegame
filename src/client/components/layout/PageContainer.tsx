import React, { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
	isMainPage?: boolean;
}

export function PageContainer(props: IProps) {
	const classNames = ["page-container"];

	if (props.isMainPage) {
		classNames.push("main-page");
	}

	return <div className={classNames.join(" ")}>{props.children}</div>;
}
