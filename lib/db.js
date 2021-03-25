// import firebase from 'firebase/app'
import * as firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/performance'

const config = {
    apiKey: "AIzaSyD8sWfr7pF2ASJDTOU5UEJ3Z0mVHaYvP4I",
    authDomain: "mi-club2ruedas.firebaseapp.com",
    databaseURL: "https://mi-club2ruedas.firebaseio.com",
    projectId: "mi-club2ruedas",
    storageBucket: "mi-club2ruedas.appspot.com",
    messagingSenderId: "892995264915",
    appId: "1:892995264915:web:e7f2f64715bc802a"
}

/*firebase.auth().signInWithCustomToken(token).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});*/

if (!firebase.apps.length && config.projectId != null) {
    firebase.initializeApp(config);
    console.log("Se inicio Firebase!")
}

// const messaging = firebase.messaging();

// messaging.usePublicVapidKey(
//     "BHS6d5MF8NzWM16yyZsWWioFgD6vY5THMqU9Cz_iyfagVWBKi_g6oMNZtmATTOUkYLlv0QKJOCJ7L76_nzQMhzg"
// );

// messaging.requestPermission()
// .then(function(){
//     console.log("tienes permisos")
// })
// .catch(function(){
//     console.log("Ocurrio error")
// })

const db = firebase.firestore()
const perMon = typeof window != 'undefined' ? firebase.performance() : null
export {
    db,
    perMon
}