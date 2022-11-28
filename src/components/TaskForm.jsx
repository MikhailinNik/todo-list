import React from 'react';

function TaskForm({ onSubmit }) {
	const [value, setValue] = React.useState('');
	const [id, setId] = React.useState(1);
	const [date, setDate] = React.useState(new Date());

	const onChangeInput = evt => {
		setValue(evt.target.value);
	};

	const onSubmitForm = evt => {
		evt.preventDefault();
		setId(id + 1);

		onSubmit({
			id: id,
			title: value,
			description: '',
			nameFile: '',
			time: date,
		});

		setValue('');
	};

	return (
		<form className="form" onSubmit={evt => onSubmitForm(evt)}>
			<div className="form__text">
				<input
					type="text"
					placeholder="Write your task..."
					value={value}
					onChange={evt => onChangeInput(evt)}
				/>
				<div className="form__date-end">
					<span>Дата завершения:</span>
					<input
						className="form__date"
						type="datetime-local"
						onChange={evt => setDate(evt.target.value)}
						value={date}
					/>
				</div>
			</div>
			<button>Add Task</button>
		</form>
	);
}

export default TaskForm;
