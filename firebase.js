import React, {Component} from 'react';
import firebase from 'firebase';

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCuCP_9gywEOgIzTfOY_8g85ggNPFOjgIQ",
    authDomain: "nativeassignment2-abbac.firebaseapp.com",
    databaseURL: "https://nativeassignment2-abbac.firebaseio.com",
    projectId: "nativeassignment2-abbac",
    storageBucket: "nativeassignment2-abbac.appspot.com",
    messagingSenderId: "528298083420",
    appId: "1:528298083420:web:883e1b325f076f9612d299"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // ユーザ登録
export const signup = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
        if (user) {
            console.log("Success to Signup")
        }
    })
    .catch(error => {
        console.log(error);
    })
}

// メール＆パスワードログイン
export const login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
        alert("Login Success!");
    })
    .catch(error => {
        alert(error.message);
    });
}

    export default firebase;