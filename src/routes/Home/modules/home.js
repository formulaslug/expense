

// ------------------------------------
// Constants
// ------------------------------------
export const SET_USER_DATA = 'SET_USER_DATA'

// ------------------------------------
// Actions
// ------------------------------------


// function initApp() {
//   firebase.auth().getRedirectResult().then( result => {
//     if (result.credential) {
//       var token = result.credential.accessToken
//       // console.log('User logged in with token: '+token)
//     } else {
//       // console.log('User was aleady logged in. Welcome back.')
//     }
//   }).catch(function(error) {
//     var errorCode = error.code
//     var errorMessage = error.message
//     var email = error.email
//     var credential = error.credential
//     if (errorCode === 'auth/account-exists-with-different-credential') {
//       alert('You have already signed up with a different auth provider for that email.')
//     } else {
//       console.error(error)
//     }
//   })
// }


function ajax(url, data) {
    data = (data == undefined) ? null : data

    return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest()
        req.onload = function() { resolve(this.responseText) }
        req.onerror = reject
        req.open('POST', url, true)
        req.setRequestHeader('Content-Type', 'Application/JSON')
        req.send(data)
    })
}

function userInit(uid, name) {
  ajax("https://still-sierra-64782.herokuapp.com/api/initUser", JSON.stringify({"uid": uid, "name": name})).then(res => {
    return JSON.parse(res)
  }, res => {
    console.log('Promise was rejected, with the following reason', res)
  }).catch( e => {
    console.warn(e)
  })
}

export const setUserData = (data) => {
  return (dispatch) => {
    new Promise((resolve, reject) => {
      ajax("https://still-sierra-64782.herokuapp.com/api/initUser", JSON.stringify({"uid": data.uid, "name": data.displayName})).then(res => {
        data = {
          uid: data.uid,
          displayName: data.displayName,
          email: data.email,
          photoURL: data.photoURL,
          characters: JSON.parse(res).characters,
        }

        dispatch ({
          type: SET_USER_DATA,
          payload: data
        })

        resolve()
      }, res => {
        console.log('Promise was rejected, with the following reason', res)
      }).catch( e => {
        console.warn(e)
      })
    })
  }
}

export const actions = {
  setUserData
}



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_USER_DATA]: (state, action) => {
    return ({...state, uid: action.payload.uid, displayName: action.payload.displayName, characters: action.payload.characters})
  }
}



// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
