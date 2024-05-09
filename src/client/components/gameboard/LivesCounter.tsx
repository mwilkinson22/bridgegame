// Modules
import React from "react";

// Constants
import { GAMEPLAY_CONSTANTS } from "~/config/constants";

// Types
type Props = {
	lives: number;
};

export function LivesCounter(props: Props) {
	const lifeIndicators = [];
	for (let i = GAMEPLAY_CONSTANTS.INITIAL_LIVES; i > 0; i--) {
		lifeIndicators.push(<div key={i} className={`life ${props.lives > i ? "used" : "not"}`} />);
	}

	return <div className="lives-counter">{lifeIndicators}</div>;
}
