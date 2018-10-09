import transitioner from '../transition-container';
import { Transition } from '../transition-container/types';
type Rect = ClientRect | DOMRect;

export interface Container {
	handleDrag: any;
	handleDrop: any;
	shouldAcceptDrop: any;
}

export interface Position {
	x: number; y: number;
}

export interface DragInfo {
	source: Container;
	position: Position;
	payload: any;
	currentTarget: Container;
}

export default function (container: Element) {
	const transitionContainer = transitioner(container, { onAnimationStarted: onTransition });

	let elementRects: Rect[] | null = null;

	function onTransition(transitions: Transition[]) {

	}

	function initEvents()

	function handleDrag(dragInfo: DragInfo) {
		
	}

	function shouldAcceptDrop(dragInfo: DragInfo) {
		
	}

	function handleDrop(){

	}

	return {
		handleDrag,
		shouldAcceptDrop,
		handleDrop,
	};
}