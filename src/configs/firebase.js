import firebase from "firebase/app";
import "firebase/auth";

// This doesn't need to be kept secret in an ENV variable
// https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
const firebaseConfig = {
  apiKey: "AIzaSyCgSmAq3eorkGOplLV7EeLy8Vsa3E_CauY",
  authDomain: "influencer-blog-52ef5.firebaseapp.com",
  projectId: "influencer-blog-52ef5",
  storageBucket: "influencer-blog-52ef5.appspot.com",
  messagingSenderId: "177574397221",
  appId: "1:177574397221:web:6f5f34050ec366a707c6cc",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
