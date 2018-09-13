import withTransaction from "./withTransaction";
import animator from "./animator";
import { Operation, OperationType } from "./types";

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

export default function (container: Element) {
	return withTransaction({
		add,
		remove,
	}, (operations) => animator(container, operations));
}