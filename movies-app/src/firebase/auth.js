import { auth } from "./firebase";
import { createUserWithEmailAndPassword , GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup , updateProfile } from "firebase/auth"; 

export const doCreateUserWithEmailAndPassword = async(name ,email , password) => {
    try {
       
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
        await updateProfile(auth.currentUser, { displayName: name });
        return userCredential;
    } catch (error) {
        throw error;
    }
}

export const doSignInWithEmailAndPassword = (email , password) => {
    return signInWithEmailAndPassword(auth , email, password)
}

export const doSignInWithGoogle = async()=> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth , provider);
    return result;
}

export const doSignOut = async()=> {
    return auth.signOut();
}

