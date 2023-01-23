const addForm = document.getElementById('add-form')
const newTaskInput = document.querySelector('.new-task-input')
const newTaskBtn = document.querySelector('.new-task-btn')
const taskFilter = document.querySelector('.task-filter')
const todoList = document.querySelector('.todo-list')

newTaskBtn.addEventListener('click', addTask)
todoList.addEventListener('click', buttonClick)
taskFilter.addEventListener('change', filterTasks)

function handleForm(e) {
	e.preventDefault()
}
addForm.addEventListener('submit', handleForm)

function addTask(e) {
	if (newTaskInput.value == '') {
		return
	}

	const newTaskDiv = document.createElement('div')
	newTaskDiv.classList.add('task')

	const newTask = document.createElement('li')
	newTask.innerText = newTaskInput.value
	newTask.classList.add('task-item')
	newTaskDiv.appendChild(newTask)

	const completeBtn = document.createElement('button')
	completeBtn.innerHTML = '<i class="fa-regular fa-square-check"></i>'
	completeBtn.classList.add('complete-btn')
	newTaskDiv.appendChild(completeBtn)

	const deleteBtn = document.createElement('button')
	deleteBtn.innerHTML = '<i class="fa-regular fa-square-minus"></i>'
	deleteBtn.classList.add('delete-btn')
	newTaskDiv.appendChild(deleteBtn)

	newTaskInput.value = ''
	todoList.appendChild(newTaskDiv)
}

function buttonClick(e) {
	let item = e.target
	let task = item.parentElement

	if (item.classList.contains('fa-regular')) {
		item = item.parentElement
		task = item.parentElement
	}
	if (item.classList.contains('complete-btn')) {
		task.classList.toggle('completed-task')
	} else if (item.classList.contains('delete-btn')) {
		task.remove()
	}
}

function filterTasks(e) {
	const tasks = todoList.childNodes
	tasks.forEach(function (task) {
		switch (e.target.value) {
			case 'all':
				task.style.display = 'flex'
				break
			case 'completed':
				if (task.classList.contains('completed-task')) {
					task.style.display = 'flex'
				} else {
					task.style.display = 'none'
				}
				break
			case 'incomplete':
				if (!task.classList.contains('completed-task')) {
					task.style.display = 'flex'
				} else {
					task.style.display = 'none'
				}
				break
		}
	})
}
