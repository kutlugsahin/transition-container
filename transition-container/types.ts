export type Rect = DOMRect | ClientRect;

export interface Transition {
	element: Element;
	oldRect?: Rect;
	newRect?: Rect;
}

export enum OperationType {
	add, remove
}

export interface Operation {
	type: OperationType;
	index: number;
	element?: Element;
}

export type AddAction = (element: Element, index: number) => Operation;
export type RemoveAction = (index: number) => Operation;

export type OperationProducer = { [key: string]: (...p: any[]) => Operation };

export interface TransitionContainer extends OperationProducer {
	add: AddAction;
	remove: RemoveAction;
}

export type Animator = (operations: Operation[]) => void;

export type ElementNode = Element & {
	[key: string]: any
}

export type TransitionMap = {
	[key: string]: Transition;
}

export type AnimationCalback = (operations: Transition[]) => void;