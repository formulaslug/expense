import React from 'react'
import './Home.scss'
import Profile from './Profile.js'
import SignIn from './SignIn.js'
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
    if (!props.userData.uid) props.setUserData(res)
  }).catch(res => {
    console.log('%cUser is not signed in.', 'color: dodgerblue')
  })
}

function getWelcomeMessage () {
  return (
    <div className='home'>
      <div className='intro'>
        <h1>/expense</h1>
        <p>An easier way to file expense reports at Formula Slug.</p>
        <p className='subtext'>
          Not a member of Formula Slug?
          <br /><br />
          We're a sustainable engineering organization at UCSC, working on
          electric racecars, solar power, transportation, and more.
          <br /><br />
          &#62; <a href='mailto:team@formulaslug.com' title='Email the team'>
          team@formulaslug.com</a>
        </p>
      </div>

      <SignIn firebase={firebase} />
    </div>
  )
}

export const Home = (props) => (
  <div>
    { console.log('%cRendering home...', 'color: grey; font-style: italic;padding: 2px') }
    { (!props.userData.uid) ? getWelcomeMessage() : <Profile displayName={props.userData.displayName} uid={props.userData.uid} firebase={firebase} /> }
    { (!props.userData.uid) ? checkForUser(props) : null }
  </div>
)

export default Home
