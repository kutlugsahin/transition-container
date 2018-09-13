import { Operation, Transition, TransitionMap, ElementNode, OperationType } from "./types";
import { insertChildAt, removeChildAt, values } from "./utils";

const elementIdKey = "@@_transition_container";

function recordElementFirstState(container: Element, map: TransitionMap) {
	return Array.prototype
		.filter.call(container.children, (p: Node) => p.nodeType === Node.ELEMENT_NODE)
		.forEach((element: ElementNode, index: number) => {
			element[elementIdKey] = index;
			map[index] = {
				element, oldRect: element.getBoundingClientRect()
			};
		});
}

function recordElementSecondState(container: Element, map: TransitionMap) {
	return Array.prototype
		.filter.call(container.children, (p: Node) => p.nodeType === Node.ELEMENT_NODE)
		.forEach((element: ElementNode, index: number) => {
			element.style.transition = 'none';
			element.style.transform = 'translate3d(0,0,0)';
			const id = element[elementIdKey];
			if (id !== undefined) {
				map[id].newRect = element.getBoundingClientRect()
				element[elementIdKey] = undefined;
			} else {
				map[`new_${index}`] = {
					element,
					newRect: element.getBoundingClientRect()
				}
			}
		});
}

function commitOperations(container: Element, operations: Operation[]) {
	operations.forEach(op => {
		if (op.type === OperationType.add) {
			insertChildAt(container, op.element!, op.index);
		} else {
			op.element = removeChildAt(container, op.index);
		}
	});
}

function applyTransitions(transitions: Transition[]) {
	// requestAnimationFrame(() => {
	transitions.forEach((transition: Transition) => {
		const { element, oldRect, newRect } = transition;
		const child = element as HTMLElement;
		if (newRect && oldRect) { //moved
			child.style.transition = 'transform 0s ease';
			child.style.transform = `translate3d(${oldRect.left - newRect.left}px, ${oldRect.top - newRect.top}px, 0)`;
		} else if (newRect) { // added
			child.style.transition = 'none';
			child.style.opacity = '0';
		} else { // removed

		}
	});

	transitions.forEach((transition: Transition) => {
		const { element, oldRect, newRect } = transition;
		element.getBoundingClientRect();
	});

	requestAnimationFrame(() => {
		transitions.forEach((transition: Transition) => {
			const { element, oldRect, newRect } = transition;
			const child = element as HTMLElement;
			if (newRect && oldRect) { //moved
				child.style.transition = 'transform 1s ease-out';
				child.style.transform = `translate3d(0,0,0)`;
			} else if (newRect) { // added
				child.style.transition = 'opacity 1s';
				child.style.opacity = '1';
			} else { // removed

			}
		});
	})
	// });
}

export default function (container: Element, operations: Operation[]) {
	const transitionMap = {};
	recordElementFirstState(container, transitionMap);
	commitOperations(container, operations);
	recordElementSecondState(container, transitionMap);
	applyTransitions(values(transitionMap));
}