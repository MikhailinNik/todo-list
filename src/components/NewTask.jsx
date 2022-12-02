import React from 'react';

import { ref, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

import { format, intervalToDuration } from 'date-fns';

import EditTask from './EditTask';
import { Context } from '..';

function NewTask({
	id,
	value,
	onClickDelete,
	description,
	onEdit,
	editTodo,
	editingText,
	editingTitle,
	setEditingTitle,
	setEditingText,
	setEditTodo,
	time,
	setSelectedFile,
	selectedFile,
	nameFile,
	setImgUrl,
	isCheck,
	setNewNameFile,
	filePath,
}) {
	const { db } = React.useContext(Context);
	const [checking, setChecking] = React.useState('');
	const [isDone, setIsDone] = React.useState(false);
	const [url, setUrl] = React.useState('');
	const checkRef = React.useRef('');

	const userTime = new Date(time);
	const result = intervalToDuration({
		start: userTime,
		end: new Date(),
	});

	const getCheckedTask = () => {
		const taskRef = doc(db, 'tasks', `task${id}`);
		return updateDoc(taskRef, { isDone: true }, { merge: true });
	};

	const onClickEditTask = id => {
		setEditingTitle(value);
		setEditingText(description);
		setEditTodo(id);
		setImgUrl(url);

		if (editTodo === id) {
			setEditTodo(null);
		}
	};

	const onChangeTask = evt => {
		setChecking(evt.target.checked);
		setIsDone(current => !current);

		getCheckedTask();
	};

	React.useEffect(() => {
		const getMilliseconds = () => {
			const totalMilliseconds =
				(result.years * 31536000 +
					result.months * 2629746 +
					result.days * 86400 +
					result.hours * 3600 +
					result.minutes * 60 +
					result.seconds) *
				1000;

			return totalMilliseconds;
		};

		setTimeout(() => {
			setIsDone(true);
			setChecking((checkRef.current.checked = true));

			getCheckedTask();
		}, getMilliseconds());
	}, [id]);

	return (
		<div
			className="container__task"
			style={{
				height: editTodo === id ? '170px' : '280px',
				backgroundColor: isDone ? '#2c2c2ccc' : '#7c39e9cc',
			}}>
			<label className="checkbox">
				<input
					ref={checkRef}
					type="checkbox"
					onChange={evt => onChangeTask(evt)}
					checked={isCheck ? checking : ''}
				/>
				<span className="checkmark"></span>
			</label>
			<div className="task__name">
				{editTodo === id ? (
					<EditTask
						id={id}
						editingTitle={editingTitle}
						setEditingTitle={setEditingTitle}
						editingText={editingText}
						setEditingText={setEditingText}
						setSelectedFile={setSelectedFile}
						selectedFile={selectedFile}
						setUrl={setUrl}
						nameFile={nameFile}
						setNewNameFile={setNewNameFile}
					/>
				) : (
					<div className="task__edited">
						<h2>{value}</h2>
						<p>{description}</p>
						<p>Дата завершения: {format(new Date(userTime), 'dd.MM.yyyy HH:mm').toString()}</p>
						{nameFile !== '' ? <img src={filePath} alt="" width={200} height={100} /> : ''}
					</div>
				)}
			</div>
			<div className="task__edit">
				<img onClick={() => onClickEditTask(id)} className="edit" src="img/edit.svg" alt="edit" />
				<img onClick={() => onClickDelete()} className="delete" src="img/delete.svg" alt="delete" />
				{editTodo === id ? (
					<img onClick={() => onEdit()} className="ok" src="img/ok.svg" alt="ok" />
				) : (
					''
				)}
			</div>
		</div>
	);
}

export default NewTask;
