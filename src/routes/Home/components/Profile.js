import React, { Component } from 'react'
import './Profile.scss'
import { Link } from 'react-router'

class Profile extends Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      legalName: null,
      ucscEmail: null,
      phone: null,
      address: null,
      ssn: null,
      payeeSetupSubmitted: false
    }
  }

  ajax (url, data) {
    data = (data === undefined) ? null : data

    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest()
      req.onload = () => { resolve(this.responseText) }
      req.onerror = reject
      req.open('POST', url, true)
      req.setRequestHeader('Content-Type', 'Application/JSON')
      req.send(data)
    })
  }

  signOut (firebase) {
    console.log('%cSigning out...', 'color: dodgerblue')
    firebase.auth().signOut()
    return window.location.reload(true)
  }

  getSavedData (props) {
    let db = props.firebase.database()

    db.ref('/users/' + props.uid).once('value').then((snapshot) => {
      let legalName = snapshot.val()['legalName']
      let ucscEmail = snapshot.val()['ucscEmail']
      let phone = snapshot.val()['phone']
      let address = snapshot.val()['address'].split('\\n')
      let payeeSetupSubmitted = snapshot.val()['payeeSetupSubmitted']
      let ssn = '**' + JSON.stringify(snapshot.val()['SSN']).substring(2, 4)

      this.setState({
        legalName,
        ucscEmail,
        phone,
        address,
        payeeSetupSubmitted,
        ssn
      })
    })
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

  formatAddress (address) {
    let res = []
    for (let row in address) {
      res.push(<div className='address' key={'address' + row}>{address[row]}</div>)
    }
    return res
  }

  render () {
    return (
      <div className='page'>
        { (this.state.legalName === null) ? this.getSavedData(this.props) : console.log(this.state.legalName) }
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
            {/* TODO: Make that edit button do stuff */}
          </div>
          <div className='row'>
            <div className='key'>Legal name</div>
            <div className='value'>{ this.state.legalName }</div>
          </div>
          <div className='row'>
            <div className='key'>UCSC email</div>
            <div className='value'>{ this.state.ucscEmail }</div>
          </div>
          <div className='row'>
            <div className='key'>Phone</div>
            <div className='value'>{ this.state.phone }</div>
          </div>
          <div className='row'>
            <div className='key'>Address</div>
            <div className='value'>{ this.formatAddress(this.state.address) }</div>
          </div>
          <div className='row'>
            <div className='key'>SSN</div>
            <div className='value'>{ this.state.ssn }</div>
          </div>
          { this.payeeSetupSubmitted(this.state.payeeSetupSubmitted) }
        </div>

        <Link to='/expense' className='button'>File a new expense report</Link>
      </div>
    )
  }
}

export default Profile
