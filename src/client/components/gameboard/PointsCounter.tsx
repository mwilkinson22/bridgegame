import React from "react";
import { IncrementingNumericTextbox } from "~/client/components/IncrementingNumericTextbox";

type Props = {
	points: number;
};
export const PointsCounter = (props: Props) => (
	<div className="points-counter">
		<IncrementingNumericTextbox className="points-ticker" value={props.points} /> Points
	</div>
);
