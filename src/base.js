import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA8F_ECsvqQh67uHdLoqIYXzrJ2SgiNnUA",
  authDomain: "we-deal-app.firebaseapp.com",
  databaseURL: "https://we-deal-app.firebaseio.com",
})

const base = Rebase.createClass(firebase.database())

export { firebaseApp }

export default base
