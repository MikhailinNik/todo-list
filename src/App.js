import React from 'react';

import './scss/index.scss';

import TaskForm from './components/TaskForm';
import NewTask from './components/NewTask';

function App() {
	const [tasks, setTasks] = React.useState([]);
	const [editingText, setEditingText] = React.useState('');
	const [editingTitle, setEditingTitle] = React.useState('');
	const [editTodo, setEditTodo] = React.useState(null);
	const [selectedFile, setSelectedFile] = React.useState(null);
	const [nameFile, setNameFile] = React.useState('Choose file');

	const addTask = task => {
		const newTask = [task, ...tasks];

		setTasks(newTask);
	};

	const onClickDelete = id => {
		const updateTasks = tasks.filter(obj => obj.id !== id);
		setTasks(updateTasks);
	};

	const editingTodo = id => {
		const updateTasks = tasks.map(task => {
			if (task.id === id) {
				task.description = editingText;
				task.title = editingTitle;
				task.nameFile = nameFile;
			}

			return task;
		});

		setTasks(updateTasks);
		setEditingText('');
		setEditingTitle('');
		setEditTodo(null);
		setNameFile(nameFile);
	};

	return (
		<div className="wrapper">
			<h1>ToDo List</h1>
			<TaskForm onSubmit={addTask} />
			<div className="container">
				{tasks.map((task, index) => (
					<NewTask
						id={task.id}
						key={index}
						description={task.description}
						value={task.title}
						file={task.nameFile}
						nameFile={nameFile}
						setNameFile={setNameFile}
						onClickDelete={() => onClickDelete(task.id)}
						onEdit={() => editingTodo(task.id)}
						editTodo={editTodo}
						editingText={editingText}
						editingTitle={editingTitle}
						setEditingTitle={setEditingTitle}
						setEditingText={setEditingText}
						setEditTodo={setEditTodo}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
