import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA9iXZIO3EjO51EFoQGUeGDlrAhsM9fhF8',
  authDomain: 'sti-attendance-c3653.firebaseapp.com',
  databaseURL: 'https://sti-attendance-c3653-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'sti-attendance-c3653',
  storageBucket: 'sti-attendance-c3653.firebasestorage.app',
  messagingSenderId: '77629757222',
  appId: '1:77629757222:web:5a27cd3ff6bd8350ef93e7',
  measurementId: 'G-6VGZZ5Z66S',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
export const auth = firebase.auth();
export const db = firebase.firestore();