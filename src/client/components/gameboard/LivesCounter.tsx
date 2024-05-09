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
	for (let i = 0; i < GAMEPLAY_CONSTANTS.INITIAL_LIVES; i++) {
		lifeIndicators.push(<div key={i} className={`life ${props.lives > i ? "not" : "used"}`} />);
	}

	return <div className="lives-counter">{lifeIndicators}</div>;
}
