import withTransaction from "./withTransaction";
import animator from "./animator";
import { Operation, OperationType, AnimationCalback } from "./types";

const defaultOptions: ContainerOptions = {

}

export interface ContainerOptions {
	onAnimationStarted?: AnimationCalback;
	watchResize?: boolean
}

function add(element: Element, index: number): Operation {
	return {
		type: OperationType.add,
		element,
		index
	};
}

function remove(index: number): Operation {
	return {
		type: OperationType.remove,
		index
	};
}

export default function (container: Element, options?: ContainerOptions) {
	const containerOptions = Object.assign({}, defaultOptions, options) as ContainerOptions;
	return withTransaction({
		add,
		remove,
	}, (operations) => animator(container, operations, containerOptions.onAnimationStarted));
}