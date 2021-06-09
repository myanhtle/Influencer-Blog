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
 * @param {string} fullName the new name
 * @param {string} username the new username
 * @param {string} email the new email
 * @param {string} password the new password
 * @returns {boolean} success
 */
const signup = async (fullName, username, email, password) => {
  try {
    const res = await fetch("http://localhost:8080/users/check/" + username);
    const { userExists } = await res.json();
    if (userExists) throw new Error("Username is already taken");
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({ displayName: username });
    await fetch("http://localhost:8080/users/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, name: fullName, email }),
    });
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
