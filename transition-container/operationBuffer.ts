import { Operation } from "./types";
import animator from "./animator";

export default function (container: Element, onAnimationStarted: any) {
	let buffer: Operation[][] = [];
	let isHandling = false;

	function handleBuffer() {
		if (buffer && buffer.length) {
			const [operations, ...rest] = buffer;
			buffer = rest;
			animator(container, operations, handleBuffer);
			isHandling = true;
		} else {
			isHandling = false;
			onAnimationStarted();
		}
	}

	return {
		handle(operations: Operation[]) {
			buffer.push(operations);
			if (!isHandling) {
				handleBuffer();
			}
		}
	}
}