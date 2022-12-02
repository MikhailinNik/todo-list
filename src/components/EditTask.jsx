import React from 'react';

import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { Context } from '../index';

export default function EditTask({
	editingTitle,
	setEditingTitle,
	editingText,
	setEditingText,
	setNewNameFile,
	setUrl,
	nameFile,
	id,
}) {
	const { storage, db } = React.useContext(Context);
	const picker = React.useRef();

	const onChangeFile = evt => {
		setNewNameFile(evt.target.files[0].name);

		const storageRef = ref(storage);
		const imageRef = ref(storageRef, 'images/' + evt.target.files[0].name);

		uploadBytes(imageRef, evt.target.files[0]);

		getDownloadURL(ref(imageRef))
			.then(url => {
				setUrl(url);
				console.log(url);
				console.log(nameFile);

				const xhr = new XMLHttpRequest();

				xhr.responseType = 'blob';

				xhr.open('GET', url);
				xhr.send();
			})
			.catch(error => console.log('ERROR downloadURL: ' + error));

		const taskRef = doc(db, 'tasks', `task${id}`);
		updateDoc(taskRef, { nameFile: evt.target.files[0].name }, { merge: true });
	};

	return (
		<>
			<input type="text" onChange={evt => setEditingTitle(evt.target.value)} value={editingTitle} />
			<textarea
				rows={5}
				cols={50}
				value={editingText}
				onChange={evt => setEditingText(evt.target.value)}
			/>
			<button className="file" onClick={() => picker.current.click()}>
				Choose file
			</button>
			<input
				onChange={evt => onChangeFile(evt)}
				className="hidden"
				type="file"
				accept="image/*"
				ref={picker}
			/>
		</>
	);
}
