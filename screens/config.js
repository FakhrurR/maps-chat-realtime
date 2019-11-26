import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAzSybN-X_4RGm9-7OV9EBX6xpzPXwMlQY',
  authDomain: 'chatapp-81370.firebaseapp.com',
  databaseURL: 'https://chatapp-81370.firebaseio.com',
  projectId: 'chatapp-81370',
  storageBucket: 'chatapp-81370.appspot.com',
  messagingSenderId: '743970900970',
  appId: '1:743970900970:web:567fab5b74419f5fc74093',
  measurementId: 'G-CVXHV9MN7D',
};
// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);

export default db;
