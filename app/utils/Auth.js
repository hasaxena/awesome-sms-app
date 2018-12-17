import firebase from "react-native-firebase";

export const SIGN_IN_SUCCESS = 1;
export const SIGN_IN_INVALID_EMAIL = "auth/invalid-email";
export const SIGN_IN_USER_DISABLED = "auth/user-disabled";
export const SIGN_IN_USER_NOT_FOUND = "auth/user-not-found";
export const SIGN_IN_WRONG_PASSWORD = "auth/wrong-password";

export const REG_CREATE_USER_SUCCESS = 1;
export const REG_EMAIL_IN_USE = "auth/email-already-in-use";
export const REG_INVALID_EMAIL = "auth/invalid-email";
export const REG_OP_NOT_ENABLED = "auth/operation-not-allowed";
export const REG_WEAK_PASSWORD = "auth/weak-password";

function loginErrorMessage(code) {}
export function loginUser(userName, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userName, password)
      .then(user => {
        resolve(user);
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch(error => {
        const { code, message } = error;
        reject(error);
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  });
}

export function registerUser(userName, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userName, password)
      .then(user => {
        resolve(user);
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch(error => {
        const { code, message } = error;
        reject(error);
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  });
}

export function signOut() {
  firebase.auth().signOut();
}
