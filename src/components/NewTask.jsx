import React from 'react';

function NewTask({ value }) {
	

	return (
		<div className="container__task">
			<div className="task__name">
				<p>{value}</p>
			</div>
			<div className="task__edit">
				<img className="edit" src="img/edit.svg" alt="edit" />
				<img className="delete" src="img/delete.svg" alt="delete" />
			</div>
		</div>
	);
}

export default NewTask;
