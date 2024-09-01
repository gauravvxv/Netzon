
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBDGY4nwTBON0brCV6Lk4KiMz-LDJ0Lql0",
    authDomain: "neton-defa7.firebaseapp.com",
    projectId: "neton-defa7",
    storageBucket: "neton-defa7.appspot.com",
    messagingSenderId: "988599920111",
    appId: "1:988599920111:web:d179e22d4ecad1d2bec21a",
    measurementId: "G-HHMCN4ZEPM"
};

const app = initializeApp(firebaseConfig);
const auth =  getAuth(app);

export {app , auth}

