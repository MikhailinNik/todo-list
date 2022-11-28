import React from 'react';

import { format, intervalToDuration } from 'date-fns';

function NewTask({
	id,
	value,
	file,
	onClickDelete,
	description,
	onEdit,
	editTodo,
	editingText,
	editingTitle,
	setEditingTitle,
	setEditingText,
	setEditTodo,
	nameFile,
	time,
	setNameFile,
}) {
	const [checking, setChecking] = React.useState('');
	const [isDone, setIsDone] = React.useState(false);
	const [countTime, setCountTime] = React.useState('');

	const checkRef = React.useRef('');
	const picker = React.useRef();

	const userTime = new Date(time);
	const result = intervalToDuration({
		start: userTime,
		end: new Date(),
	});

	const onClickEditTask = id => {
		setEditingTitle(value);
		setEditingText(description);
		setEditTodo(id);
		setNameFile(file);

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
				height: editTodo === id ? '170px' : '130px',
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
				{/* Создать отдельный компонент формы  */}
				{editTodo === id ? (
					<>
						<input
							type="text"
							onChange={evt => setEditingTitle(evt.target.value)}
							value={editingTitle}
						/>
						<textarea
							rows={5}
							cols={50}
							value={editingText}
							onChange={evt => setEditingText(evt.target.value)}
						/>
						<button className="file" onClick={() => picker.current.click()}>
							{file === '' ? 'Choose file' : file}
						</button>
						<input
							onChange={evt =>
								evt.target.files.length ? setNameFile(evt.target.files[0].name) : 'Choose file'
							}
							className="hidden"
							type="file"
							accept="image/*"
							ref={picker}
						/>
					</>
				) : (
					<>
						<h2>{value}</h2>
						<p>{description}</p>
						<p>Дата завершения: {format(new Date(userTime), 'dd.MM.yyyy HH:mm').toString()}</p>
						<p>{file}</p>
					</>
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
