// Modules
import React, { useEffect, useRef, useState } from "react";

// Types
type Props = {
	className?: string;
	value: number;
};

export function IncrementingNumericTextbox({ value, className }: Props) {
	// Set ref object - we initialise a dummy span to aid Typescript
	const ref = useRef(document.createElement("span"));

	// Set State
	const [prevValue, setPrevValue] = useState(value);
	const [animatedClassName, setAnimatedClassName] = useState("");
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	// Define some callback functions
	const getValue = () => Number(ref.current.textContent);
	const setValue = (value: number) => (ref.current.textContent = value.toString());
	const endAnimation = (id: NodeJS.Timeout) => {
		clearInterval(id);
		setIntervalId(null);
		setAnimatedClassName("");
	};

	useEffect(() => {
		// Clear out any existing animations to prevent conflicts.
		if (intervalId) {
			endAnimation(intervalId);
		}

		if (prevValue !== value) {
			setValue(prevValue);
			// Work out our steps in each interval.
			const isIncrease = value > prevValue;
			const animationTime = 200;
			const animationRate = 16;
			const animationIterations = animationTime / animationRate;
			const stepLevel = (value - prevValue) / animationIterations;

			// Update the css class
			setAnimatedClassName(isIncrease ? "incrementing" : "decrementing");

			// Create our interval
			const interval = setInterval(() => {
				const nextValue = Math.round(getValue() + stepLevel);
				// We stop once we've reached (or passed) the target.
				const reachedTarget = isIncrease ? nextValue >= value : nextValue <= value;

				if (reachedTarget) {
					// Update to the target, to make sure we're not temporarily stepping past it.
					endAnimation(interval);
					setValue(value);
				} else {
					// Update to the next value, regardless of what it is
					setValue(nextValue);
				}
			}, animationRate);
			setIntervalId(interval);
		}

		// Update our "last value" state object
		setPrevValue(value);
	}, [value]);

	const classNames = [animatedClassName, className ?? ""];
	return (
		<span className={classNames.join(" ").trim()} ref={ref}>
			{value}
		</span>
	);
}
