import React from 'react';
import './scss/app.scss';

import TaskForm from './components/TaskForm';
import NewTask from './components/NewTask';

function App() {
	const [tasks, setTasks] = React.useState([]);

	const addTask = task => {
		const newTask = [task, ...tasks];

		setTasks(newTask);
		console.log(...tasks);
	};
	return (
		<div className="wrapper">
			<h1>ToDo List</h1>
			<TaskForm onSubmit={addTask} />
			<div className="container">
				<NewTask />
			</div>
		</div>
	);
}

export default App;
