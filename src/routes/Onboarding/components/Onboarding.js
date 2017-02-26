import React, { Component } from 'react'
import './Onboarding.scss'
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

class Onboarding extends Component {

  // TODO: fill the state from props, if props are defined

  constructor (props, context) {
    super(props, context)
    this.uid = props.location.query.uid;
    this.getSavedData();
    this.state = {
      step: 1,
      legalName: ((this.props.legalName) ? this.props.legalName : null),
      ucscEmail: ((this.props.ucscEmail) ? this.props.ucscEmail : null),
      phone: ((this.props.phone) ? this.props.phone : null),
      address: [((this.props.address) ? this.props.address : null)],
      ssn: {
        value: null,
        error: null
      },
      payeeSetupSubmitted: false,
      slack: {
        value: ((this.props.slack) ? this.props.slack : null),
        error: null
      }
    }
  }

  getSavedData() {
    firebase.database().ref('/users/' + this.uid).once('value').then((snapshot) => {
      const slack = snapshot.val()['slack']
      const legalName = snapshot.val()['legalName']
      const ucscEmail = snapshot.val()['ucscEmail']
      const phone = snapshot.val()['phone']
      const address = snapshot.val()['address'].split('\\n')
      const payeeSetupSubmitted = snapshot.val()['payeeSetupSubmitted']
      const ssn = '**' + JSON.stringify(snapshot.val()['SSN']).substring(2, 4)

      const data = {
        slack,
        legalName,
        ucscEmail,
        phone,
        address,
        payeeSetupSubmitted,
        ssn
      }

      this.setState(data)
      console.log(this.state);
    })
  }

  save(event) {
    const _ = this.refs;
    let data = {
      slack : (_.slack) ? _.slack.value : "",
      legalName : (_.legalName) ? _.legalName.value : "",
      ucscEmail : (_.ucscEmail) ? _.ucscEmail.value : "",
      phone : (_.phone) ? _.phone.value : "",
      address : (_.address) ? _.address.value : "",
      SSN : (_.ssn) ? _.ssn.value : "",
      payeeSetupSubmitted : false
    }

    if(data) firebase.database().ref('users/' + this.uid).set(data);
  }

  render () {
    return (
      <div>
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
            <input ref='slack' type='text' placeholder='@username' value={this.state.slack} />
            <span className='error'>{ this.state.slack.error }</span>
          </div>

          <div className='inputGroup'>
            <p>What's your legal name?</p>
            <input ref='legalName' type='text' placeholder='Firstname lastname' value={this.state.legalName} />
          </div>

          <div className='inputGroup'>
            <p>What's your phone number?</p>
            <p className='helperText'>This is required for submitting reimbursement forms to the university.</p>
            <input ref='phone' type='tel' placeholder='123.456.7890' value={this.state.phone} />
          </div>

          <div className='inputGroup'>
            <p>What's your address?</p>
            <p className='helperText'>This is also required for submitting reimbursement forms to the university.</p>
            <input ref='street' type='text' placeholder='123 Anydrive Road' />
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
              <input ref='city' type='text' placeholder='Santa Cruz' className='twoThird' />
            </div>
          </div>

          <div className='inputGroup'>
            <p>Last 4 digits of your SSN, please.</p>
            <p className='helperText'>This is optional, but if you skip it, you'll have to manually download and add it to your reimbursement forms later. We store and trasnmit this data securely.</p>
            <input ref='ssn' type='number' inputMode='numeric' placeholder='1234' pattern='[0-9]{4}'  value={this.state.ssn} required />
            <span className='error'>{ this.state.ssn.error }</span>
          </div>

          <div className='inputGroup'>
            <p>Have you filled out an 204 form?</p>
            <p className='helperText'>A 204 form is required by the college for reimbursements.</p>
            <ul>
              <li name='button' value='1'>
                <input type='hidden' value="Yes" autoComplete="off" />
                <span className="label">Yes</span>
              </li>
              <li name='button'>
                <input type='hidden' value="No" autoComplete="off" />
                <span className="label">No</span>
              </li>
            </ul>
          </div>

          <div className='inputGroup'>
            <button onClick={(event) => this.save(event)}>
              Save
            </button>
          </div>
        </section>
      </div>
    )
  }
}

export default Onboarding
