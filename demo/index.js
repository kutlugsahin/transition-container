import transition from '../transition-container';
import './styles.css';
let ghostElement = null;
let transitions = [];
import { throttle } from 'lodash';

const container = document.getElementById('container');
const add = document.getElementById('add');
const swap = document.getElementById('swap');

const t = transition(container, {
	onAnimationStarted
});

add.addEventListener('click', () => {
	const div = document.createElement('div');
	div.className = 'item';
	t.add(div, 0);
});

swap.addEventListener('click', () => {
	const elem = container.children[0];
	t.remove(0);
	t.add(elem, 3);

})

let childrenRects = Array.prototype
	.filter.call(container.children, (p) => p.nodeType === Node.ELEMENT_NODE)
	.map(p => p.getBoundingClientRect());


function onAnimationStarted(_transitions) {
	// childrenRects = Array.prototype
	// 	.filter.call(container.children, (p) => p.nodeType === Node.ELEMENT_NODE)
	// 	.map(p => p.getBoundingClientRect());
	transitions = _transitions;
}

container.addEventListener('mouseenter', () => {
	container.addEventListener('mousemove', onmove);
})

container.addEventListener('mouseleave', () => {
	container.removeEventListener('mousemove', onmove);

	if (ghostElement) {
		t.remove(ghostElement.index);
		// t.add(ghostElement.element, index);
		ghostElement = null;
	}
})

function moveGhostElement(index) {
	if (ghostElement) {
		t.remove(ghostElement.index);
		t.add(ghostElement.element, index);
		ghostElement.index = index;
	} else {
		const element = document.createElement('div');
		element.isGhostElement = true;
		element.className = 'ghost';
		ghostElement = {
			index,
			element
		};
		t.add(element, index);
	}
}

function asd() {
	
}

var onmove = onMouseMoveOverContainer; //throttle(onMouseMoveOverContainer, 100);

	function onMouseMoveOverContainer(e) {
		const { clientX: x, clientY: y } = e;

		const rects = transitions ? transitions.filter(p => p.newRect).map(p => p.newRect) : Array.prototype
			.filter.call(container.children, (p) => p.nodeType === Node.ELEMENT_NODE)
			.map(p => p.getBoundingClientRect());

		// const rects = Array.prototype
		// 	.filter.call(container.children, (p) => p.nodeType === Node.ELEMENT_NODE)
		// 	.map(p => p.getBoundingClientRect());

		const index = rects.findIndex(p => {
			if (!p) {
				console.log(rects);
				debugger;
			}
			return x >= p.left && y >= p.top && x < (p.left + p.width) && y < (p.top + p.height);
		});

		if (index > -1 && container.children[index] && !transitions[index].isGhostElement) {
			moveGhostElement(index);
		}
	}