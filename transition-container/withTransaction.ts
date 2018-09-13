import { OperationProducer, Animator, Operation } from "./types";

export default function (operationProducer: OperationProducer, callback: Animator): OperationProducer {
	const operations: Operation[] = [];
	let timer: number | null = null;
	return Object.keys(operationProducer)
		.filter(p => Object.prototype.hasOwnProperty.call(operationProducer, p))
		.reduce((result: OperationProducer, key: string) => {
			result[key] = (...params) => {
				const operation = operationProducer[key](...params);
				if (timer === null) {
					timer = setTimeout(() => {
						callback(operations);	
					});
				}
				operations.push(operation);
				return operation;
			}

			return result;
		}, {});
}