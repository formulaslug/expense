import React, { Component } from 'react'
import './Profile.scss'
import { Link } from 'react-router'

class Profile extends Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      convo: {},
      user: {
        name: {
          first: 'Alex',
          last: 'Price'
        }
      },
      nextSession: {
        startTime: '12:00',
        chargerGroup: 'Faraday Building',
        charger: '4'
      }
    }
  }

  signOut (firebase) {
    console.log('%cSigning out...', 'color: dodgerblue')
    firebase.auth().signOut()
    return window.location.reload(true)
  }

  getSavedData (props) {

  }

  payeeSetupSubmitted (submitted) {
    if (submitted) {
      return null
    } else {
      return (
        <div className='row err'>
          <div className='key'>204 Submitted</div>
          <div className='value'>NO</div>
        </div>
      )
    }
  }

  render () {
    return (
      <div className='page'>
        { this.getSavedData() }
        <header>
          <nav>
            <h1>/expense</h1>
            <div onClick={() => this.signOut(this.props.firebase)} className='link subtext'>Logout</div>
          </nav>

          <p>Make sure the saved data we have below is accurate—we use this to fill out expense forms for you.</p>
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
          { this.payeeSetupSubmitted(false) }
        </div>

        <Link to='/expense' className='button'>File a new expense report</Link>
      </div>
    )
  }
}

export default Profile
