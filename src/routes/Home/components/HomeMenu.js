import React from 'react'


export const HomeMenu = (props) => (
  <div>
    <div className='paper--menu'>
      <div className='paper'>
        <div className='button'>Continue as { getCharacterName(props.metadata.characters) }</div>
        <div className='button'>Create a new character</div>
        <div className='button'>Options</div>
        <div className='bottom-bar'>
          <span>Need help?</span>
          <div onClick={() => signOut(props.metadata.firebase)}>Logout</div>
        </div>
      </div>
    </div>
  </div>
)

export default HomeMenu
