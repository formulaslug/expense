import React from 'react'
import './Home.scss'
import HomeMenu from './HomeMenu.js'
import SignIn from './SignIn.js'
// import { Link } from 'react-router'
import * as firebase from 'firebase'

if (!firebase.apps.length) {
  console.log('%cCreating a new firebase instance...', 'color: grey; font-style: italic;padding: 2px')
  let config = {
    apiKey: 'AIzaSyANToL6Ybf-yoYNbB9jiZ_qjW3EVhu17P0',
    authDomain: 'expense-9fef4.firebaseapp.com',
    databaseURL: 'https://expense-9fef4.firebaseio.com',
    storageBucket: 'expense-9fef4.appspot.com',
    messagingSenderId: '144236555959'
  }
  firebase.initializeApp(config)
}

let userData = {}
function checkForUser (props) {
  new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let displayName = user.displayName
        let email = user.email
        let photoURL = user.photoURL
        let uid = user.uid
        userData = { uid, displayName, email, photoURL }
        resolve(userData)
      } else {
        reject(false)
      }
    })
  }).then(res => {
    console.log(res)
    if (!props.userData.uid) props.setUserData(res)
  }).catch(res => {
    console.log('%cUser is not signed in.', 'color: dodgerblue')
    console.log(res)
  })
}

function signOut (firebase) {
  console.log('%cSigning out...', 'color: dodgerblue')
  firebase.auth().signOut()
  return window.location.reload(true)
}

export const Home = (props) => (
  <div className='home'>
    { console.log('%cRendering home...', 'color: grey; font-style: italic;padding: 2px') }

    <div className='intro'>
      <h1>/expense</h1>
      <p>An easier way to file expense reports at Formula Slug.</p>
      <p className='subtext'>
        Not a member of Formula Slug? Email us at team@formulaslug.com, or check out our website.
      </p>
    </div>
    
    <div onClick={() => signOut(props.metadata.firebase)}>Logout</div>

    { (props.userData.uid) ? <HomeMenu metadata={{displayName: props.userData.displayName, uid: props.userData.uid, firebase}} /> : <SignIn metadata={{firebase: firebase}} />}
    { (!props.userData.uid) ? checkForUser(props) : null }
  </div>
)

export default Home
