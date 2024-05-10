// Modules
import React, { ReactNode, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";

type Props = {
	children: ReactNode;
	minScale?: number;
	maxScale?: number;
	wrapperClass?: string;
};

export function PanAndZoomElement(props: Props) {
	const wrapperRef = useRef(document.createElement("div"));
	const contentRef = useRef(document.createElement("div"));

	const getHorizontalCentreAdjustment = (ref: ReactZoomPanPinchRef) =>
		(wrapperRef.current.getBoundingClientRect().width - contentRef.current.getBoundingClientRect().width) / 2 - ref.state.positionX;
	const getVerticalCentreAdjustment = (ref: ReactZoomPanPinchRef) =>
		(wrapperRef.current.getBoundingClientRect().height - contentRef.current.getBoundingClientRect().height) / 2 - ref.state.positionY;

	// Prevent scrolling out of bounds
	const fixBoundaries = (ref: ReactZoomPanPinchRef) => {
		const wrapperRect = wrapperRef.current.getBoundingClientRect();
		const boardRect = contentRef.current.getBoundingClientRect();

		// Work out what adjustments to make.
		let xAdjustment = 0;
		let yAdjustment = 0;

		if (boardRect.width > wrapperRect.width) {
			const leftOutOfBoundsBy = boardRect.left - wrapperRect.left;
			const rightOutOfBoundsBy = wrapperRect.left - boardRect.right + wrapperRect.width;

			if (leftOutOfBoundsBy > 0) {
				xAdjustment = -leftOutOfBoundsBy;
			} else if (rightOutOfBoundsBy > 0) {
				xAdjustment = rightOutOfBoundsBy;
			}
		} else {
			xAdjustment = getHorizontalCentreAdjustment(ref);
		}

		if (boardRect.height > wrapperRect.height) {
			const topOutOfBoundsBy = boardRect.top - wrapperRect.top;
			const bottomOutOfBoundsBy = wrapperRect.top - boardRect.bottom + wrapperRect.height;

			if (topOutOfBoundsBy > 0 && bottomOutOfBoundsBy < 0) {
				yAdjustment = -topOutOfBoundsBy;
			} else if (bottomOutOfBoundsBy > 0 && topOutOfBoundsBy < 0) {
				yAdjustment = bottomOutOfBoundsBy;
			}
		} else {
			yAdjustment = getVerticalCentreAdjustment(ref);
		}

		if (yAdjustment || xAdjustment) {
			const newX = ref.state.positionX + xAdjustment;
			const newY = ref.state.positionY + yAdjustment;
			ref.setTransform(newX, newY, ref.state.scale);
		}
	};

	// Update on window resize.
	let onResizeListener = () => {};
	useEffect(() => {
		window.addEventListener("resize", onResizeListener);
		return () => {
			window.removeEventListener("resize", onResizeListener);
		};
	}, []);

	return (
		<div className={props.wrapperClass} ref={wrapperRef}>
			<TransformWrapper
				limitToBounds={false}
				minScale={props.minScale ?? 1}
				maxScale={props.maxScale ?? 8}
				onInit={ref => {
					onResizeListener = () => fixBoundaries(ref);
					ref.zoomToElement(contentRef.current, undefined, 0);
				}}
				onPanningStop={fixBoundaries}
				onZoomStop={ref => {
					const wrapperRect = wrapperRef.current.getBoundingClientRect();
					const boardRect = contentRef.current.getBoundingClientRect();
					if (wrapperRect.width > boardRect.width && wrapperRect.height > boardRect.height) {
						ref.zoomToElement(contentRef.current);
					}
				}}
			>
				<TransformComponent>
					<div ref={contentRef}>{props.children}</div>
				</TransformComponent>
			</TransformWrapper>
		</div>
	);
}
