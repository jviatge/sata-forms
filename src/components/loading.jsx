import {CSSProperties} from "react";

const Loading = ({spaceSize="large",className, style,color}) => {


	let padding = ""

	switch (spaceSize) {
		case "normal":
			padding = "py-10"
			break;
		case "small":
			padding = "py-5"
			break;
		case "large":
			padding = "py-20"
			break;
	}

	let resolveColor = ""
	switch (color) {
		case "primary":
			resolveColor = "text-primary"
			break;
		case "secondary":
			resolveColor = "text-scondary"
			break;
		default:
			resolveColor = ""
	}

	return(
		<svg
			className={className ?? 'h-20 w-20'}
			version="1.1"
			id="L9"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 100 100"
			enableBackground="new 0 0 0 0"
			xmlSpace="preserve">
			<path fill={'currentColor'} d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
				<animateTransform
					attributeName="transform"
					attributeType="XML"
					type="rotate"
					dur="1s"
					from="0 50 50"
					to="360 50 50"
					repeatCount="indefinite" />
			</path>
		</svg>
	)
}

export {Loading}