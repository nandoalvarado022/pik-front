import firebase from 'firebase/app'
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyD8sWfr7pF2ASJDTOU5UEJ3Z0mVHaYvP4I",
  authDomain: "mi-club2ruedas.firebaseapp.com",
  databaseURL: "https://mi-club2ruedas.firebaseio.com",
  projectId: "mi-club2ruedas",
  storageBucket: "mi-club2ruedas.appspot.com"
}

if (!firebase.apps.length && config.projectId != null) {
  firebase.initializeApp(config);
}

const storage = firebase.storage()

export {
  storage,
  firebase
}