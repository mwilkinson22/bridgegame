// Modules
import React, { PropsWithChildren, useState } from "react";

// Types
type Props = PropsWithChildren & {
	title: string;
	onDestroy: () => void;
};

export const Dialog = (props: Props) => {
	const [isClosing, setIsClosing] = useState(false);

	const animationDuration = 200;

	function destroy() {
		setIsClosing(true);
		setTimeout(props.onDestroy, 200);
	}

	return (
		<div className={`dialog-background ${isClosing ? "closing" : ""}`} onClick={destroy} style={{ animationDuration: animationDuration + "ms" }}>
			<div className="dialog" onClick={e => e.stopPropagation()}>
				<div className="close-dialog-cross" onClick={destroy}>
					🗙
				</div>
				<h2 className="dialog-title">{props.title}</h2>
				{props.children}
			</div>
		</div>
	);
};
