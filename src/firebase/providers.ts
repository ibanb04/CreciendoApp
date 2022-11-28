import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";
import { FirebaseAuth, FirebaseDB } from "./config";
import { studentDefaultValuesProps } from "../components/NewStudent/utils/studentDefaultValues";
import { interviewDefaultValuesProps } from "../components/NewInterview/utils/interviewDefaultValues";
import { useAppDispatch } from "../store/useAppDispatch";
import { Dispatch } from "../store/slices/auth/thunks";

export const registerUserWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string,
  role: string
) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    await updateProfile(resp.user, { displayName });
    const docRef = doc(FirebaseDB, `usuarios/${resp.user.uid}`);
    await setDoc(docRef, { email: email, rol: role });
    return {
      ok: true,
      displayName,
      email,
      role,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error,
    };
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { displayName, photoURL, uid } = resp.user;
    return {
      ok: true,
      displayName,
      photoURL,
      uid,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error,
    };
  }
};

export const logoutFirebase = async () => {
  try {
    await FirebaseAuth.signOut();
    return { ok: true };
  } catch (error) {
    return { ok: false, errorMessage: error };
  }
};
export const startStudenRegister = async (
  data: studentDefaultValuesProps | interviewDefaultValuesProps
) => {
  try {
    const docuRef = await doc(FirebaseDB, `estudiantes/${data.idNumber}`);
    setDoc(docuRef, data);
  } catch (error) {
    console.log(error);
  }
};

export const registerInterview = async (
  data: studentDefaultValuesProps | interviewDefaultValuesProps
) => {
  try {
    const docuRef = await doc(FirebaseDB, `entrevistas/${data.studentId}`);
    setDoc(docuRef, data);
  } catch (error) {
    console.log(error);
  }
};

export const getStudentById = async (id: string) => {
  try {
    const docuRef = await doc(FirebaseDB, `estudiantes/${id}`);
    const docSnap = await getDoc(docuRef);
    console.log(docSnap.data());
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};


export const getStudents = async () => {
  const querySnapshot = await getDocs(collection(FirebaseDB, "estudiantes/"));
  const students = await querySnapshot.docs.map((doc) => doc.data());
  return students;
};


