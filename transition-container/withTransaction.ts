import { OperationProducer, Animator, Operation } from "./types";

export default function (operationProducer: OperationProducer, callback: Animator): OperationProducer {
	let operations: Operation[] = [];
	let timer: number | null = null;

	function onTransactionComplete() {
		timer = null;
		callback(operations);
		operations = [];
	}

	return Object.keys(operationProducer)
		.filter(p => Object.prototype.hasOwnProperty.call(operationProducer, p))
		.reduce((result: OperationProducer, key: string) => {
			result[key] = (...params) => {
				const operation = operationProducer[key](...params);
				if (timer === null) {
					timer = setTimeout(() => {
						onTransactionComplete();	
					});
				}
				operations.push(operation);
				return operation;
			}

			return result;
		}, {});
}