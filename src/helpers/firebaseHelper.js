import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc,getDoc, serverTimestamp } from "firebase/firestore";

// auth functions
export const signUp = async (formData) => {
  try {
    const { firstName, lastName, email, password } = formData;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), 
      {
        firstName,
        lastName,
        email,
        todos: [],
        createdAt: serverTimestamp(),
      }
    );
    return user;
    
  } catch (error) {
    console.error("Error signing up User:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in User:", error);
    throw error;
  }
};

export const logout = async () => {
    try{
        await signOut(auth);
    }catch(error){
        console.error("Error logging out User:", error);
        throw error;
    }
}

//user data functions
export const fetchUserData = async (uid) => {
  try {
   const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if(userDoc.exists()){
        return userDoc.data();
    }else{
        console.warn("No user data found for UID:", uid);
        return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};