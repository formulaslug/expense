// Constants
// export const IMPORT_CHARACTER = 'IMPORT_CHARACTER'

// ACTIONS
// function ajax (url, data) {
//   data = (data === undefined) ? null : data
//
//   return new Promise (function (resolve, reject) {
//     let req = new XMLHttpRequest()
//     req.onload = function() { resolve(this.responseText) }
//     req.onerror = reject
//     req.open('POST', url, true)
//     req.setRequestHeader('Content-Type', 'Application/JSON')
//     req.send(data)
//   })
// }

// function userInit (uid, name) {
//   ajax("https://still-sierra-64782.herokuapp.com/api/initUser", JSON.stringify({"uid": uid, "name": name})).then(res => {
//     return JSON.parse(res)
//   }, res => {
//     console.log('Promise was rejected, with the following reason', res)
//   }).catch( e => {
//     console.warn(e)
//   })
// }

// export const importCharacter = (uid, characterName) => {
//   return (dispatch) => {
//     new Promise((resolve, reject) => {
//       ajax ('https://still-sierra-64782.herokuapp.com/api/importCharacter', JSON.stringify({uid, characterName})).then(res => {
//         let data = { uid, character: JSON.parse(res) }
//
//         dispatch ({
//           type: IMPORT_CHARACTER,
//           payload: data
//         })
//
//         resolve()
//       }, res => {
//         console.log('Promise was rejected, with the following reason', res)
//       }).catch( e => {
//         console.warn(e)
//       })
//     })
//   }
// }

export const actions = {
  // importCharacter
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  // [IMPORT_CHARACTER]: (state, action) => {
  //   return ({...state, uid: action.payload.uid, character: action.payload.character})
  // }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
