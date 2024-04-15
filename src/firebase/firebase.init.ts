import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // Importe os módulos necessários: firestore, storage, auth, etc.
import "firebase/compat/storage";
import "firebase/compat/firestore";
import firebaseConfig from "./firebase.config";

// Inicialize o Firebase com suas configurações
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();

export default firebase;
