// Modules
import React from "react";

// Types
type Props = {
	lives: number;
};

export function LivesCounter(props: Props) {
	const lifeIndicators = [];
	for (let i = 2; i >= 0; i--) {
		lifeIndicators.push(<div key={i} className={`life ${props.lives > i ? "used" : "not"}`} />);
	}

	return <div className="lives-counter">{lifeIndicators}</div>;
}
