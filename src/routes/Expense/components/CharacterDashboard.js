import React from 'react'
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CharacterNavbar from './CharacterNavbar'
import SectionReference from './sections/Reference'
import SectionQuestlog  from './sections/Questlog'
import SectionInventory from './sections/Inventory'
import SectionAbilities from './sections/Abilities'
import SectionNotebook  from './sections/Notebook'

function dashboardSectionRouter(props) {
  let characterKey = props.characterKey
  let sectionKey = props.sectionKey

  switch (sectionKey) {
    case 'reference':
      return <div className='sectionContainer'><SectionReference key={characterKey} metadata={props.character} /></div>
    case 'notebook':
      return <div className='sectionContainer'><SectionNotebook key={characterKey} metadata={props.character} /></div>
    case 'questlog':
      return <div className='sectionContainer'><SectionQuestlog key={characterKey} metadata={props.character} /></div>
    case 'inventory':
      return <div className='sectionContainer'><SectionInventory key={characterKey} metadata={props.character} /></div>
    case 'abilities':
      return <div className='sectionContainer'><SectionAbilities key={characterKey} metadata={props.character} /></div>
    default:
      return <div className='sectionContainer'><SectionNotebook key={characterKey} metadata={props.character} /></div>
  }
}

export const CharacterDashboard = (p) => (
  <div>
    <Link to='/' activeClassName='route--active'>
      <h2 style={{'textAlign': 'center'}}>{ p.metadata.character['name'] }</h2>
    </Link>
    <ReactCSSTransitionGroup component="div" transitionName={'sectionMove'+(Math.floor(Math.random()*2)==1 ? 'Alt' : '')} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
      {React.cloneElement(dashboardSectionRouter(p.metadata), {
        key: p.metadata.pathname
      })}
    </ReactCSSTransitionGroup>

    <CharacterNavbar characterName={{characterKey: p.metadata.characterKey, sectionKey: p.metadata.sectionKey}} />

    {/* <h2>Health: {props.character}</h2> */}
    {/* { (props.character < 0) ? <div>U DIED SRY</div> : null } */}
    {/* <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.decrementAsync}>
      Decrement (Async)
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button> */}
  </div>
)

export default CharacterDashboard
