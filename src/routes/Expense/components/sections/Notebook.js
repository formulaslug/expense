import React from 'react'
import './sections.scss'

export const Notebook = (props) => (
  <section>
    I'm a Notebook!
    This is the main screen, and likely what you'll interact with most often.
    Here, you'll be able to find:
    <ul className='todoList'>
      <li>health, temp, max and current</li>
      <li>spell slots</li>
      <li>consumables</li>
      <li>active abilities (like action surge)</li>
      <li>and any other trackable things that change often</li>
      <li>also short and long rest buttons will live here</li>
    </ul>

    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </section>
)

export default Notebook
