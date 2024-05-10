// Modules
import React, { PropsWithChildren, useState } from "react";

// Types
export type DialogDestroyFunction = () => void;
type Props = PropsWithChildren & {
	className?: string;
	title: string;
	onDestroy: DialogDestroyFunction;
};

export const Dialog = (props: Props) => {
	const [isClosing, setIsClosing] = useState(false);

	const animationDuration = 200;

	function destroy() {
		setIsClosing(true);
		setTimeout(props.onDestroy, 200);
	}

	const backgroundClassNames = ["dialog-background"];
	if (isClosing) {
		backgroundClassNames.push("closing");
	}

	const dialogClassNames = ["dialog"];
	if (props.className) {
		dialogClassNames.push(props.className);
	}

	return (
		<div className={backgroundClassNames.join(" ")} onClick={destroy} style={{ animationDuration: animationDuration + "ms" }}>
			<div className={dialogClassNames.join(" ")} onClick={e => e.stopPropagation()}>
				<div className="close-dialog-cross" onClick={destroy}>
					⨯
				</div>
				<h2 className="dialog-title">{props.title}</h2>
				<div className="dialog-content">{props.children}</div>
			</div>
		</div>
	);
};
