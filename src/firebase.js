import { v4 as uuidv4 } from 'uuid';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	getDocs,
	setDoc,
	doc,
} from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAu1o4V8CnXvk7_nGTYv_QYc4SPP6sqjVE',
	authDomain: 'blog-website-6fc6c.firebaseapp.com',
	projectId: 'blog-website-6fc6c',
	storageBucket: 'blog-website-6fc6c.appspot.com',
	messagingSenderId: '574036036015',
	appId: '1:574036036015:web:57a04376eec5034cdfc75a',
	measurementId: 'G-45KK5ZN8MM',
};

// IMP: Firebase Database

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// IMP: init services
const database = getFirestore();

// IMP: collection ref

const colRef = collection(database, 'posts');

//  IMP: get collection data

const posts = getDocs(colRef)
	.then(snapshot => {
		let posts = [];
		snapshot.docs.forEach(doc => {
			posts.push({ ...doc.data(), id: doc.id });
		});
		return posts;
	})
	.catch(e => {
		console.log(e);
		return [];
	});

// IMP: set data

// IMP: Auth Data
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { posts, auth, provider, database, colRef };
