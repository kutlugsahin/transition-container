export function insertChildAt(parent: Element, child: Element, index: number) {
	const before = parent.children[index];
	parent.insertBefore(child, before);
}

export function removeChildAt(parent: Element, index: number) {
	return parent.removeChild(parent.children[index]);
}

export function values(map: any) {
	return Object.keys(map).filter(p => Object.prototype.hasOwnProperty.call(map, p)).map(p => map[p]);
}