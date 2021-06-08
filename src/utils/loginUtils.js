import firebase from "../configs/firebase";

/**
 * Attempts to log in the user
 * @param {string} email the user's email
 * @param {string} password the user's password
 * @returns {boolean} success
 */
const login = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    console.log(error);
    alert(error.message);
    return false;
  }
};

/**
 * Attempts to create a new account
 * @param {string} username the new username
 * @param {string} email the new email
 * @param {string} password the new password
 * @returns {boolean} success
 */
const signup = async (username, email, password) => {
  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({ displayName: username });
    return true;
  } catch (error) {
    console.log(error);
    alert(error.message);
    return false;
  }
};

/**
 * Deletes the account of the current user
 * @returns {boolean} success
 */
const deleteAccount = async () => {
  try {
    await firebase.auth().currentUser.delete();
    return true;
  } catch (error) {
    console.log(error);
    alert(error.message);
    return false;
  }
};

export { login, signup, deleteAccount };
