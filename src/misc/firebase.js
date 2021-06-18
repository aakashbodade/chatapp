import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyA8ryyfUM2Il6rlJYBJE9eeqzsmBC7GBjs",
  authDomain: "chatapp-b862d.firebaseapp.com",
  databaseURL: "https://chatapp-b862d-default-rtdb.firebaseio.com",
  projectId: "chatapp-b862d",
  storageBucket: "chatapp-b862d.appspot.com",
  messagingSenderId: "694526778",
  appId: "1:694526778:web:5b395241353dc038ae6603",
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
