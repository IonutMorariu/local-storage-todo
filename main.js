const taskItem = document.querySelector('#tasks__item--component');
const addButton = document.querySelector('.task__add__button');
const taskContainer = document.querySelector('.tasks__container');
const input = document.querySelector('.task__add__input');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const renderTasks = container => {
	taskContainer.innerHTML = '';
	tasks.forEach((element, index) => {
		const item = taskItem.cloneNode(true);
		item.setAttribute('data-element', index);
		if (element.done) {
			item.querySelector('.task__item--text').classList.add('done');
		}
		item.querySelector('.task__item--checkbox').checked = element.done;
		item.querySelector('.task__item--text').textContent = element.text;
		item.querySelector('.task__item--text').setAttribute('for', 'task-' + index);
		item.querySelector('.task__item--checkbox').id = 'task-' + index;
		item.querySelector('.task__remove').addEventListener('click', () => {
			tasks.splice(index, 1);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			renderTasks(taskContainer);
		});
		item.querySelector('.task__item--checkbox').addEventListener('click', () => {
			tasks[index].done = item.querySelector('.task__item--checkbox').checked;
			localStorage.setItem('tasks', JSON.stringify(tasks));
			renderTasks(taskContainer);
		});
		container.appendChild(item);
	});
};
renderTasks(taskContainer);

const addTaskToList = () => {
	const task = { text: input.value, done: false };
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
	input.value = '';
	renderTasks(taskContainer);
};

input.addEventListener('keyup', event => {
	if (event.which == 13) {
		addTaskToList();
	}
});

addButton.addEventListener('click', addTaskToList);
