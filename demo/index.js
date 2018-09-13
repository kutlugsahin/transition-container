import transition from '../transition-container';
import './styles.css';

const container = document.getElementById('container');
const add = document.getElementById('add');

const t = transition(container);

add.addEventListener('click', () => {
	const div = document.createElement('div');
	div.className = 'item';
	div.innerHTML = '211231 3123123';

	t.add(div, 0);
})