import React, { Component } from 'react'
import './Onboarding.scss'
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

class Onboarding extends Component {

  // TODO: fill the state from props, if props are defined

  constructor (props, context) {
    super(props, context)
    this.state = {
      step: 1,
      legalName: ((this.props.legalName) ? this.props.legalName : null),
      ucscEmail: ((this.props.legalName) ? this.props.legalName : null),
      phone: ((this.props.legalName) ? this.props.legalName : null),
      address: [((this.props.legalName) ? this.props.legalName : null)],
      ssn: {
        value: null,
        error: null
      },
      payeeSetupSubmitted: false,
      slack: {
        value: null,
        error: null
      }
    }
  }

  render () {
    return (
      <div>
        { console.log(this.props, this.state) }
        <header>
          <nav>
            <h1>/expense</h1>
            <div onClick={() => this.signOut(this.props.firebase)} className='link subtext'>Logout</div>
          </nav>

          <p className='subtext'>
            Need help? Post in <a href='https://fsae.slack.com/messages/finance/' className='link'>#finance</a>.
          </p>

          <hr />
        </header>

        <section>
          <div className='inputGroup'>
            <p>What's your FSAE Slack username?</p>
            <input type='text' placeholder='@username' />
            <span className='error'>{ this.state.slack.error }</span>
          </div>

          <div className='inputGroup'>
            <p>What's your legal name?</p>
            <input type='text' placeholder='Firstname lastname' />
          </div>

          <div className='inputGroup'>
            <p>What's your phone number?</p>
            <p className='helperText'>This is required for submitting reimbursement forms to the university.</p>
            <input type='tel' placeholder='123.456.7890' />
          </div>

          <div className='inputGroup'>
            <p>What's your address?</p>
            <p className='helperText'>This is also required for submitting reimbursement forms to the university.</p>
            <input type='text' placeholder='123 Anydrive Road' />
            <div className='inputsRow'>
              <select className='oneThird'>
                <option value='AL'>AL</option>
                <option value='AK'>AK</option>
                <option value='AZ'>AZ</option>
                <option value='AR'>AR</option>
                <option value='CA'>CA</option>
                <option value='CO'>CO</option>
                <option value='CT'>CT</option>
                <option value='DE'>DE</option>
                <option value='DC'>DC</option>
                <option value='FL'>FL</option>
                <option value='GA'>GA</option>
                <option value='HI'>HI</option>
                <option value='ID'>ID</option>
                <option value='IL'>IL</option>
                <option value='IN'>IN</option>
                <option value='IA'>IA</option>
                <option value='KS'>KS</option>
                <option value='KY'>KY</option>
                <option value='LA'>LA</option>
                <option value='ME'>ME</option>
                <option value='MD'>MD</option>
                <option value='MA'>MA</option>
                <option value='MI'>MI</option>
                <option value='MN'>MN</option>
                <option value='MS'>MS</option>
                <option value='MO'>MO</option>
                <option value='MT'>MT</option>
                <option value='NE'>NE</option>
                <option value='NV'>NV</option>
                <option value='NH'>NH</option>
                <option value='NJ'>NJ</option>
                <option value='NM'>NM</option>
                <option value='NY'>NY</option>
                <option value='NC'>NC</option>
                <option value='ND'>ND</option>
                <option value='OH'>OH</option>
                <option value='OK'>OK</option>
                <option value='OR'>OR</option>
                <option value='PA'>PA</option>
                <option value='RI'>RI</option>
                <option value='SC'>SC</option>
                <option value='SD'>SD</option>
                <option value='TN'>TN</option>
                <option value='TX'>TX</option>
                <option value='UT'>UT</option>
                <option value='VT'>VT</option>
                <option value='VA'>VA</option>
                <option value='WA'>WA</option>
                <option value='WV'>WV</option>
                <option value='WI'>WI</option>
                <option value='WY'>WY</option>
              </select>
              <input type='text' placeholder='Santa Cruz' className='twoThird' />
            </div>
          </div>

          <div className='inputGroup'>
            <p>Last 4 digits of your SSN, please.</p>
            <p className='helperText'>This is optional, but if you skip it, you'll have to manually download and add it to your reimbursement forms later. We store and trasnmit this data securely.</p>
            <input type='number' inputMode='numeric' placeholder='1234' pattern='[0-9]{4}' required />
            <span className='error'>{ this.state.ssn.error }</span>
          </div>

        </section>
      </div>
    )
  }
}

export default Onboarding
