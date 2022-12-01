import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import 'firebase/compat/firestore';

const firebaseApp = initializeApp({
	apiKey: 'AIzaSyAfxzZ-xDPzRW8hCrQ3scZwtMSg7zatRs4',
	authDomain: 'todo-list-4fa68.firebaseapp.com',
	databaseURL: 'https://todo-list-4fa68-default-rtdb.firebaseio.com',
	projectId: 'todo-list-4fa68',
	storageBucket: 'todo-list-4fa68.appspot.com',
	messagingSenderId: '114787903813',
	appId: '1:114787903813:web:8ac751cf6debbd9ab2762c',
});

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export const Context = React.createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Context.Provider
			value={{
				firebase,
				db,
				storage,
			}}>
			<App />
		</Context.Provider>
	</React.StrictMode>,
);
