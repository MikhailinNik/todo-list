import React from 'react';

import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ref, getMetadata, getDownloadURL } from 'firebase/storage';

import './scss/index.scss';

import TaskForm from './components/TaskForm';
import NewTask from './components/NewTask';

import { Context } from './index';

function App() {
	const { db, storage } = React.useContext(Context);
	const [editingText, setEditingText] = React.useState('');
	const [editingTitle, setEditingTitle] = React.useState('');
	const [editTodo, setEditTodo] = React.useState(null);
	const [selectedFile, setSelectedFile] = React.useState(null);
	const [imgUrl, setImgUrl] = React.useState('');
	const [newNameFile, setNewNameFile] = React.useState('');
	const [tasks, loading, error] = useCollectionData(collection(db, 'tasks'));

	React.useEffect(() => {
		if (loading) {
			return alert('LOADING');
		}

		showImages();
	}, [tasks]);

	function showImages() {
		try {
			const storageRef = ref(storage);
			tasks.forEach(task => {
				if (task.nameFile !== '') {
					const imageRef = ref(storageRef, 'images/' + task.nameFile);

					getDownloadURL(ref(imageRef))
						.then(url => {
							setImgUrl(url);
							const xhr = new XMLHttpRequest();

							xhr.responseType = 'blob';

							xhr.open('GET', url);
							xhr.send();
						})
						.catch(error => console.log('ERROR downloadURL: ' + error));

					setImgUrl('');
				}
			});
		} catch (error) {
			console.log(error);
		}
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
			if (!id) {
				return false;
			}

			const collectionRef = doc(db, 'tasks', 'task' + id);
			const updateObject = {
				description: editingText ? editingText : '',
				title: editingTitle ? editingTitle : '',
				nameFile: newNameFile ? newNameFile : '',
			};

			await updateDoc(collectionRef, updateObject);

			const storageRef = ref(storage);
			const fileRef = ref(storageRef, 'images/');

			await getMetadata(fileRef)
				.then(metadata => {
					console.log('metadata: ' + metadata);
				})
				.catch(error => {
					console.log('ERROR: ' + error);
				});
		} catch (error) {
			console.log('ERROR: ' + error);
		}

		setEditingText('');
		setEditingTitle('');
		setEditTodo(null);
		setSelectedFile(null);
		setNewNameFile('');
	};

	return (
		<div className="wrapper">
			<h1>ToDo List</h1>
			<TaskForm />
			<div className="container">
				{tasks &&
					tasks.map((task, index) => (
						<NewTask
							id={task.taskId}
							key={index}
							description={task.description}
							value={task.title}
							time={task.time}
							nameFile={task.nameFile}
							onClickDelete={() => onClickDelete(task.taskId)}
							onEdit={() => editingTodo(task.taskId)}
							editTodo={editTodo}
							editingText={editingText}
							editingTitle={editingTitle}
							setEditingTitle={setEditingTitle}
							setEditingText={setEditingText}
							setEditTodo={setEditTodo}
							selectedFile={selectedFile}
							setSelectedFile={setSelectedFile}
							imgUrl={imgUrl}
							setImgUrl={setImgUrl}
							isCheck={task.isDone}
							newNameFile={newNameFile}
							setNewNameFile={setNewNameFile}
						/>
					))}
			</div>
		</div>
	);
}

export default App;
