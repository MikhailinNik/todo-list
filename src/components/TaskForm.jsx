import React from 'react';

import { setDoc, doc } from 'firebase/firestore';

import { Context } from '../index';

function TaskForm() {
	const { db } = React.useContext(Context);
	const [value, setValue] = React.useState('');
	const [id, setId] = React.useState(1);
	const [date, setDate] = React.useState(new Date());

	const onChangeInput = evt => {
		setValue(evt.target.value);
	};

	const onSubmitForm = async evt => {
		evt.preventDefault();

		setId(id + 1);

		try {
			await setDoc(doc(db, 'tasks', 'task' + id), {
				taskId: id,
				title: value,
				description: '',
				time: date,
				nameFile: '',
			});
		} catch (error) {
			console.log('ERROR: ' + error);
		}

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
						required="required"
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
