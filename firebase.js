// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { collection, getFirestore, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTAVzMAmqEVM9laphrlQQJxaZb_5gZBs8",
  authDomain: "fir-crud-9ec6f.firebaseapp.com",
  projectId: "fir-crud-9ec6f",
  storageBucket: "fir-crud-9ec6f.appspot.com",
  messagingSenderId: "171310967838",
  appId: "1:171310967838:web:fb366734610a0f170ad20f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveTask = (title, description)=>{

    addDoc(collection(db, 'task'),{title, description})
};

export const getTasks = () => getDocs(collection(db,'task'))

export const onGetTask = (callback)=> onSnapshot(collection(db,'task'), callback)

export const deleteTask = id => deleteDoc(doc(db, 'task', id))

export const getTask = (id) => getDoc(doc(db,'task', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'task', id), newFields)