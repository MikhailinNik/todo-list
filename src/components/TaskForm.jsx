import React from 'react';

function TaskForm({ onSubmit }) {
	const [value, setValue] = React.useState('');
	const [id, setId] = React.useState(1);

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
		});

		setValue('');
	};
	return (
		<form className="form" onSubmit={evt => onSubmitForm(evt)}>
			<input
				type="text"
				placeholder="Write your task..."
				value={value}
				onChange={evt => onChangeInput(evt)}
			/>
			<button>Add Task</button>
		</form>
	);
}

export default TaskForm;
