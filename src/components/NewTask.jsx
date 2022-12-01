import React from 'react';

import { format, intervalToDuration } from 'date-fns';

import EditTask from './EditTask';

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
	imgUrl,
}) {
	const [checking, setChecking] = React.useState('');
	const [isDone, setIsDone] = React.useState(false);
	const [url, setUrl] = React.useState('');
	const checkRef = React.useRef('');

	const userTime = new Date(time);
	const result = intervalToDuration({
		start: userTime,
		end: new Date(),
	});

	const onClickEditTask = id => {
		setEditingTitle(value);
		setEditingText(description);
		setEditTodo(id);

		if (editTodo === id) {
			setEditTodo(null);
		}
	};

	const onChangeTask = evt => {
		setChecking(evt.target.checked);
		setIsDone(current => !current);
	};

	React.useEffect(() => {
		setTimeout(() => {
			setIsDone(true);
			setChecking((checkRef.current.checked = true));
		}, result.seconds * 1000);
	});

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
					checked={checking}
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
					/>
				) : (
					<div className="task__edited">
						<h2>{value}</h2>
						<p>{description}</p>
						<p>Дата завершения: {format(new Date(userTime), 'dd.MM.yyyy HH:mm').toString()}</p>
						{nameFile !== '' ? (
							<img src={imgUrl} alt="" width={200} height={100} />
						) : url === '' ? (
							''
						) : (
							<img src={url} alt="" width={200} height={100} />
						)}
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
