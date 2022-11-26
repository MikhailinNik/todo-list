import React from 'react';

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
	setNameFile,
}) {
	const [checking, setChecking] = React.useState('');
	const [isDone, setIsDone] = React.useState(false);
	const [date, setDate] = React.useState();

	const picker = React.useRef();

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

	const onClickFile = evt => {
		picker.current.click();
		evt.target.text = nameFile;
		console.log(file);
		console.log(nameFile);
	};

	return (
		<div
			className="container__task"
			style={{
				height: editTodo === id ? '170px' : '130px',
				backgroundColor: isDone ? '#2c2c2ccc' : '#7c39e9cc',
			}}>
			<label className="checkbox">
				<input type="checkbox" onChange={evt => onChangeTask(evt)} checked={checking} />
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
						<button className="file" onClick={evt => onClickFile(evt)}>
							{nameFile !== '' ? file : 'Choose file'}
						</button>
						<input
							onChange={evt => setNameFile(evt.target.files[0].name)}
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
						<p>{file}</p>

						{/* <img src={ } alt={} /> */}
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
