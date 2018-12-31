import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA8F_ECsvqQh67uHdLoqIYXzrJ2SgiNnUA",
  authDomain: "we-deal-app.firebaseapp.com",
  databaseURL: "https://we-deal-app.firebaseio.com",
  projectId: "we-deal-app",
  storageBucket: "we-deal-app.appspot.com",
  messagingSenderId: "718133117701"
})

const base = Rebase.createClass(firebase.database())

const storage = firebase.storage()

export { firebaseApp }

export { storage, base as default } 
