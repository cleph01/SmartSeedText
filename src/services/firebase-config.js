import firebase from "firebase";

const config = {
    apiKey: "AIzaSyATeDJsgQkdBHgJ_uf_Fbh5Tvn6lxg4RsU",
    authDomain: "tap2txt-com.firebaseapp.com",
    projectId: "tap2txt-com",
    storageBucket: "tap2txt-com.appspot.com",
    messagingSenderId: "329426294131",
    appId: "1:329426294131:web:b12b1df886ccdd03d06106",
    measurementId: "G-T6J191ZSK5",
};

const initFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
};

initFirebase();

// export default firebase;

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, firebase };
