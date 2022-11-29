import React from 'react';

import { collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import './scss/index.scss';

import TaskForm from './components/TaskForm';
import NewTask from './components/NewTask';

import { Context } from './index';

function App() {
	const { db } = React.useContext(Context);

	const [editingText, setEditingText] = React.useState('');
	const [editingTitle, setEditingTitle] = React.useState('');
	const [editTodo, setEditTodo] = React.useState(null);
	const [selectedFile, setSelectedFile] = React.useState(null);
	const [nameFile, setNameFile] = React.useState('');
	const [tasks, loading, error] = useCollectionData(collection(db, 'tasks'));

	if (loading) {
		return alert('LOADING');
	}

	const onClickDelete = async id => {
		try {
			await deleteDoc(doc(db, 'tasks', 'task' + id));
		} catch (error) {
			console.log('ERROR: ' + error);
		}
	};

	const editingTodo = async id => {
		try {
			if (!id) return false;

			const collectionRef = doc(db, 'tasks', 'task' + id);

			const updateObject = {
				description: editingText ? editingText : '',
				title: editingTitle ? editingTitle : '',
				file: nameFile ? nameFile : '',
			};

			await updateDoc(collectionRef, updateObject);
		} catch (error) {
			console.log('ERROR: ' + error);
		}

		setEditingText('');
		setEditingTitle('');
		setEditTodo(null);
		setNameFile('');
	};

	return (
		<div className="wrapper">
			<h1>ToDo List</h1>
			<TaskForm />
			<div className="container">
				{tasks.map((task, index) => (
					<NewTask
						id={task.taskId}
						key={index}
						description={task.description}
						value={task.title}
						file={task.nameFile}
						time={task.time}
						nameFile={nameFile}
						setNameFile={setNameFile}
						onClickDelete={() => onClickDelete(task.taskId)}
						onEdit={() => editingTodo(task.taskId)}
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
