import React from 'react'
import './Profile.scss'
import { Link } from 'react-router'

function signOut (firebase) {
  console.log('%cSigning out...', 'color: dodgerblue')
  firebase.auth().signOut()
  return window.location.reload(true)
}

export const Profile = (props) => (
  <div className='page'>
    <header>
      <nav>
        <h1>/expense</h1>
        <div onClick={() => signOut(props.firebase)} className='link subtext'>Logout</div>
      </nav>

      <p>Hey {props.displayName}, make sure the saved data we have below is accurate—we use this to fill out expense forms for you.</p>
      <p className='subtext'>
        Need help? Post in <a href='https://fsae.slack.com/messages/finance/' className='link'>#finance</a>.
      </p>
    </header>

    <div className='savedData'>
      <div className='row'>
        <div className='key'>Saved data</div>
        <div className='key'>Edit</div>
      </div>
      <div className='row'>
        <div className='key'>Legal name</div>
        <div className='value'>&#60;name&#62;</div>
      </div>
      <div className='row'>
        <div className='key'>UCSC email</div>
        <div className='value'>&#60;email&#62;</div>
      </div>
      <div className='row'>
        <div className='key'>Phone</div>
        <div className='value'>&#60;phone&#62;</div>
      </div>
      <div className='row'>
        <div className='key'>Address</div>
        <div className='value'>&#60;address&#62;</div>
      </div>
      <div className='row'>
        <div className='key'>SSN</div>
        <div className='value'>&#60;ssn&#62;</div>
      </div>
    </div>

    <Link to='/expense' className='button'>File a new expense report</Link>
  </div>
)

export default Profile
