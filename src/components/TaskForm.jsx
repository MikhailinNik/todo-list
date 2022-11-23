import React from 'react';

import NewTask from './NewTask';

function TaskForm({ onSubmit }) {
	const [value, setValue] = React.useState('');

	const onChangeInput = evt => {
		setValue(evt.target.value);
	};

	const onClickBtn = evt => {
		evt.preventDefault();

		onSubmit({
			id: count++,
			text: value,
		});
	};
	return (
		<form className="form" onSubmit={evt => onClickBtn(evt)}>
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
