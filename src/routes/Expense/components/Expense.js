import React from 'react'
import './Expense.scss'
// import CharacterDashboard from './CharacterDashboard'
// import * as firebase from 'firebase'

// if (!firebase.apps.length) {
//   console.log('%cCreating a new firebase instance...', "color: grey; font-style: italic;padding: 2px")
//   let config = {
//       apiKey: "AIzaSyCM6-ZkljQSJAIP9GW83urxC3-2ahRwV8M",
//       authDomain: "playbook-9e0c7.firebaseapp.com",
//       databaseURL: "https://playbook-9e0c7.firebaseio.com",
//       storageBucket: "playbook-9e0c7.appspot.com",
//       messagingSenderId: "41836465090"
//   }
//   firebase.initializeApp(config)
// }

// Get character data
// function checkForUser(props) {
//   new Promise((resolve, reject) => {
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         let uid = user.uid
//         resolve(uid, props.params.characterName)
//       } else {
//         reject(console.warn('User DNE'))
//       }
//     })
//   }).then( uid => {
//     if (!props.character.uid) props.importCharacter(uid, props.params.characterName)
//   }).catch( res => {
//     console.log('User is not signed in.', res)
//   })
// }

export const Expense = (props) => (
  <div>
    { console.log(props) }
    FILE YOUR EXPENSE REPORT HERE 100% FREE.
  </div>
)

export default Expense
