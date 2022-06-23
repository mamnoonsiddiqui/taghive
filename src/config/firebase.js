// import firebase from "./firebase";

import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, query, getDocs, collection, where, addDoc, updateDoc, doc } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyDfQ0GFqoKEEKJ-4vrsWIxmv7meIapmL4s",
    authDomain: "taghive-3fca1.firebaseapp.com",
    projectId: "taghive-3fca1",
    storageBucket: "taghive-3fca1.appspot.com",
    messagingSenderId: "376289082734",
    appId: "1:376289082734:web:2d160c85c38a81b3d3157f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, app, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,query, getDocs, collection, where, addDoc, updateDoc,doc };

// For Data Adding 

// addDoc(collection(db, "mcq"), {
//     a:"mamnoon",
//     b:"siddiqui",
//     c:"asdfasdf",
//     d:"232423423",
//     question:"who is MP - 7 - Sc ",
//     subject_id:"I73gSznLSvTzQTNbKe4Y",
//     correct_option:"c"
// });
// addDoc(collection(db, "mcq"), {
//     a:"mamnoon",
//     b:"siddiqui",
//     c:"asdfasdf",
//     d:"232423423",
//     question:"who is MP - 7 - Sc -2",
//     subject_id:"I73gSznLSvTzQTNbKe4Y",
//     correct_option:"c"
// });
// addDoc(collection(db, "mcq"), {
//     a:"mamnoon",
//     b:"siddiqui",
//     c:"asdfasdf",
//     d:"232423423",
//     question:"who is MP - 7 - Sc - 3",
//     subject_id:"I73gSznLSvTzQTNbKe4Y",
//     correct_option:"d"
// });
// addDoc(collection(db, "mcq"), {
//     a:"mamnoon",
//     b:"siddiqui",
//     c:"asdfasdf",
//     d:"232423423",
//     question:"who is MP - 7 - Sc - 4",
//     subject_id:"I73gSznLSvTzQTNbKe4Y",
//     correct_option:"a"
// });
// addDoc(collection(db, "mcq"), {
//     a:"mamnoon",
//     b:"siddiqui",
//     c:"asdfasdf",
//     d:"232423423",
//     question:"who is MP - 7 - Sc - 5",
//     subject_id:"I73gSznLSvTzQTNbKe4Y",
//     correct_option:"b"
// });
// addDoc(collection(db, "mcq"), {
//     a:"mamnoon",
//     b:"siddiqui",
//     c:"asdfasdf",
//     d:"232423423",
//     question:"who is MP - 7 - Sc - 7",
//     subject_id:"I73gSznLSvTzQTNbKe4Y",
//     correct_option:"d"
// });

// addDoc(collection(db, "mcq_data"), {class_data:[
//     {
//         class: 6,
//         subjects: [
//             {
//                 name: "Maths-6",
//                 questions: [
//                     {
//                         question: "what is MP",
//                         a: "mamnoon",
//                         b: "siddiqui",
//                         c: "23",
//                         d: "8772",
//                         correct_option: "c"
//                     },
//                     {
//                         question: "what is MP",
//                         a: "mamnoon",
//                         b: "siddiqui",
//                         c: "23",
//                         d: "8772",
//                         correct_option: "b"
//                     },
//                     {
//                         question: "what is MP",
//                         a: "mamnoon",
//                         b: "siddiqui",
//                         c: "23",
//                         d: "8772",
//                         correct_option: "a"
//                     },
//                 ]
//             },
//             {
//                 name: "Science-6",
//                 questions: [
//                     {
//                         question: "what is MP-science",
//                         a: "mamnoon",
//                         b: "siddiqui",
//                         c: "23",
//                         d: "8772",
//                         correct_option: "c"
//                     },
//                     {
//                         question: "what is MP",
//                         a: "mamnoon",
//                         b: "siddiqui",
//                         c: "23",
//                         d: "8772",
//                         correct_option: "b"
//                     },
//                     {
//                         question: "what is MP",
//                         a: "mamnoon",
//                         b: "siddiqui",
//                         c: "23",
//                         d: "8772",
//                         correct_option: "a"
//                     },
//                 ]
//             }
//         ]
//     },
//     {
//         class: 7,
//         subjects: [
//             {
//                 name: "Maths-7",
//                 questions: [
//                     {
//                         question: "what is MP",
//                         a: "mamnoon",
//                         b: "siddiqui",
//                         c: "23",
//                         d: "8772",
//                         correct_option: "c"
//                     },
//                     {
//                         question: "what is MP",
//                         a: "mamnoon",
//                         b: "siddiqui",
//                         c: "23",
//                         d: "8772",
//                         correct_option: "b"
//                     },
//                     {
//                         question: "what is MP",
//                         a: "mamnoon",
//                         b: "siddiqui",
//                         c: "23",
//                         d: "8772",
//                         correct_option: "a"
//                     },
//                 ]
//             },
//             {
//                 name: "Science-7",
//                 questions: [
//                     {
//                         question: "what is MP-science",
//                         a: "mamnoon",
//                         b: "siddiqui",
//                         c: "23",
//                         d: "8772",
//                         correct_option: "c"
//                     },
//                     {
//                         question: "what is MP",
//                         a: "mamnoon",
//                         b: "siddiqui",
//                         c: "23",
//                         d: "8772",
//                         correct_option: "b"
//                     },
//                     {
//                         question: "what is MP",
//                         a: "mamnoon",
//                         b: "siddiqui",
//                         c: "23",
//                         d: "8772",
//                         correct_option: "a"
//                     },
//                 ]
//             }
//         ]
//     }
// ]});

