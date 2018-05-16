import firebase from "firebase";

const config = {
  apiKey: "AIzaSyARq6nbKWcSzkPB2eZeTN2gRUtM_FmoYcY",
  authDomain: "unsplash-img.firebaseapp.com",
  databaseURL: "https://unsplash-img.firebaseio.com",
  projectId: "unsplash-img",
  storageBucket: "unsplash-img.appspot.com",
  messagingSenderId: "955651223929"
};

firebase.initializeApp(config);

const db = firebase.firestore();
export default db;
