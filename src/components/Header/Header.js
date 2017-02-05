import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import PlaybookIcon from './icon.png'

export const Header = () => (
  <nav>
    <IndexLink to='/' activeClassName='route--active'>
      <img src={PlaybookIcon} className='brandIcon' alt='Playbook' />
    </IndexLink>
    {/* <div>
      <Link to='/character' activeClassName='route--active'>Character</Link>
    </div> */}
    {/* TODO: Add navigation for current character? Should this be an
        if some state prop is true, display character nav for prop
        "selectedCharacter"? */}
  </nav>
)

export default Header
