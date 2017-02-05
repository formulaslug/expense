import React from 'react'
import './sections.scss'

function getProficiencyBonus(classes) {
  let levels = 0
  for (let classKey in classes) {
    levels += classes[classKey].levels
  }

  return Math.floor(levels/4.1)+2
}

function getMod(score) {
  let mod = Math.floor((score-10)/2)
  if (mod < 0) return <span>-{mod}</span>
  else if (mod > 0) return <span>+{mod}</span>
  else if (mod ==0) return <span className='data--zero'>{mod}</span>
}

function getSavingThrowMod(abilityscores, ability, proficiencyScore) {
  let profBonus = abilityscores.savingthrowsproficiency[ability]*proficiencyScore
  let mod = profBonus + Math.floor((abilityscores.base[ability]-10)/2)
  if (mod < 0) return <span>-{mod}</span>
  else if (mod > 0) return <span>+{mod}</span>
  else if (mod ==0) return <span className='data--zero'>{mod}</span>
}

function getSkillMod(skillProf, ability, proficiencyScore) {
  let mod = skillProf*proficiencyScore + Math.floor((ability-10)/2)
  if (mod < 0) return <span>-{mod}</span>
  else if (mod > 0) return <span>+{mod}</span>
  else if (mod ==0) return <span className='data--zero'>{mod}</span>
}

function getProficiencyList(profList, profListName) {
  let res = ''
  for (var skill in profList) {
    if (res != '') res += ', '
    res += profList[skill].trim()
  }
  if (profList == '') return 'No ' + profListName + 'proficiencies.'
  else return res
}

function getDescription(background) {
  return (
    <div>
      <div className='singleRowTable'>
        <div className='singleRowTable--column'>
          <div className='singleRowTable--data norm'>{ background.height }, { background.weight }<span className='smallCaps'>LBS</span></div>
          <div className='singleRowTable--label'>height & weight</div>
        </div>
        <div className='singleRowTable--column'>
          <div className='singleRowTable--data norm'>{ background.age }</div>
          <div className='singleRowTable--label'>age</div>
        </div>

        <div className='singleRowTable--column'>
          <div className='singleRowTable--data norm'>{ background.race }</div>
          <div className='singleRowTable--label'>race</div>
        </div>
      </div>
    </div>
  )
}

function getBackstory(history) {
  let res = []
  for (let paragraph in history) {
    res.push(<p key={'history_'+paragraph}>{ history[paragraph] }</p>)
  }
  return <div>{ res }</div>
}

export const SectionReference = (props) => (
  <section>
    <div>
      <div className='singleRowTable'>
        <div className='singleRowTable--column'>
          <div className='singleRowTable--data'>18</div>
          <div className='singleRowTable--label'>AC</div>
        </div>

        <div className='singleRowTable--column'>
          <div className='singleRowTable--data'>+{Math.floor((props.metadata.abilityscores.base.dexterity-10)/2)}</div>
          <div className='singleRowTable--label'>Init.</div>
        </div>

        <div className='singleRowTable--column'>
          <div className='singleRowTable--data'>30<span className='smallCaps'> ft</span></div>
          <div className='singleRowTable--label'>Speed</div>
        </div>

        <div className='singleRowTable--column'>
          <div className='singleRowTable--data'>+{getProficiencyBonus(props.metadata.classes)}</div>
          <div className='singleRowTable--label'>Prof.</div>
        </div>
      </div>
    </div>

    <div>
      <div className='singleRowTable noSeps'>
        <div className='singleRowTable--column'>
          <div className='singleRowTable--label'>STR</div>
          <div className='singleRowTable--data'>{getMod(props.metadata.abilityscores.base.strength)}</div>
          <div className='singleRowTable--label'>{props.metadata.abilityscores.base.strength}</div>
        </div>

        <div className='singleRowTable--column'>
          <div className='singleRowTable--label'>DEX</div>
          <div className='singleRowTable--data'>{getMod(props.metadata.abilityscores.base.dexterity)}</div>
          <div className='singleRowTable--label'>{props.metadata.abilityscores.base.dexterity}</div>
        </div>

        <div className='singleRowTable--column'>
          <div className='singleRowTable--label'>CON</div>
          <div className='singleRowTable--data'>{getMod(props.metadata.abilityscores.base.constitution)}</div>
          <div className='singleRowTable--label'>{props.metadata.abilityscores.base.constitution}</div>
        </div>

        <div className='singleRowTable--column'>
          <div className='singleRowTable--label'>INT</div>
          <div className='singleRowTable--data'>{getMod(props.metadata.abilityscores.base.intelligence)}</div>
          <div className='singleRowTable--label'>{props.metadata.abilityscores.base.intelligence}</div>
        </div>

        <div className='singleRowTable--column'>
          <div className='singleRowTable--label'>WIS</div>
          <div className='singleRowTable--data'>{getMod(props.metadata.abilityscores.base.wisdom)}</div>
          <div className='singleRowTable--label'>{props.metadata.abilityscores.base.wisdom}</div>
        </div>

        <div className='singleRowTable--column'>
          <div className='singleRowTable--label'>CHA</div>
          <div className='singleRowTable--data'>{getMod(props.metadata.abilityscores.base.charisma)}</div>
          <div className='singleRowTable--label'>{props.metadata.abilityscores.base.charisma}</div>
        </div>
      </div>
    </div>


    {/* SAVING THROWS */}
    <div>
      <h3>Saving Throws</h3>
      <table>
    		<thead>
    			<tr>
    				<th><span className='decorative'>—</span></th>
    				<th>STR</th>
    				<th>DEX</th>
    				<th>CON</th>
    				<th>INT</th>
    				<th>WIS</th>
    				<th>CHA</th>
    			</tr>
    		</thead>
        <tbody>
    			<tr>
    				<td className='label'>prof</td>
    				<td>{(props.metadata.abilityscores.savingthrowsproficiency.strength) ? '✓' : ''	}</td>
    				<td>{(props.metadata.abilityscores.savingthrowsproficiency.dexterity) ? '✓' : ''	}</td>
    				<td>{(props.metadata.abilityscores.savingthrowsproficiency.constitution) ? '✓' : ''	}</td>
    				<td>{(props.metadata.abilityscores.savingthrowsproficiency.intelligence) ? '✓' : ''	}</td>
    				<td>{(props.metadata.abilityscores.savingthrowsproficiency.wisdom) ? '✓' : ''	}</td>
    				<td>{(props.metadata.abilityscores.savingthrowsproficiency.charisma) ? '✓' : ''	}</td>
    			</tr>
    			<tr>
    				<td className='label'>mod</td>
    				<td>{getSavingThrowMod(props.metadata.abilityscores, 'strength', getProficiencyBonus(props.metadata.classes))}</td>
    				<td>{getSavingThrowMod(props.metadata.abilityscores, 'dexterity', getProficiencyBonus(props.metadata.classes))}</td>
    				<td>{getSavingThrowMod(props.metadata.abilityscores, 'constitution', getProficiencyBonus(props.metadata.classes))}</td>
    				<td>{getSavingThrowMod(props.metadata.abilityscores, 'intelligence', getProficiencyBonus(props.metadata.classes))}</td>
    				<td>{getSavingThrowMod(props.metadata.abilityscores, 'wisdom', getProficiencyBonus(props.metadata.classes))}</td>
    				<td>{getSavingThrowMod(props.metadata.abilityscores, 'charisma', getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
        </tbody>
      </table>
    </div>


    {/* OFFICIAL SKILLS */}
    <div>
      <h3>Skills</h3>
      <table className='skillsTable'>
    		<thead>
    			<tr>
    				<th>Skill</th>
    				<th></th>
    				<th>Modifier</th>
    			</tr>
    		</thead>

    		<tbody>
    			<tr>
            <td className='label'>Dex</td>
    				<td className='label'>Acrobatics {(props.metadata.abilityscores.skillsproficiency.acrobatics) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.acrobatics, props.metadata.abilityscores.base.dexterity, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Wis</td>
    				<td className='label'>Animal Handling {(props.metadata.abilityscores.skillsproficiency.animalhandling) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.animalhandling, props.metadata.abilityscores.base.wisdom, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Int</td>
    				<td className='label'>Arcana {(props.metadata.abilityscores.skillsproficiency.arcana) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.arcana, props.metadata.abilityscores.base.intelligence, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Str</td>
    				<td className='label'>Athletics {(props.metadata.abilityscores.skillsproficiency.athletics) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.athletics, props.metadata.abilityscores.base.strength, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Cha</td>
    				<td className='label'>Deception {(props.metadata.abilityscores.skillsproficiency.deception) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.deception, props.metadata.abilityscores.base.charisma, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Int</td>
    				<td className='label'>History {(props.metadata.abilityscores.skillsproficiency.history) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.history, props.metadata.abilityscores.base.intelligence, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Wis</td>
    				<td className='label'>Insight {(props.metadata.abilityscores.skillsproficiency.insight) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.insight, props.metadata.abilityscores.base.wisdom, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Cha</td>
    				<td className='label'>Intimidation {(props.metadata.abilityscores.skillsproficiency.intimidation) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.intimidation, props.metadata.abilityscores.base.charisma, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Int</td>
    				<td className='label'>Investigation {(props.metadata.abilityscores.skillsproficiency.investigation) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.investigation, props.metadata.abilityscores.base.intelligence, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Wis</td>
    				<td className='label'>Medicine {(props.metadata.abilityscores.skillsproficiency.medicine) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.medicine, props.metadata.abilityscores.base.wisdom, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Int</td>
    				<td className='label'>Nature {(props.metadata.abilityscores.skillsproficiency.nature) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.nature, props.metadata.abilityscores.base.intelligence, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Wis</td>
    				<td className='label'>Perception {(props.metadata.abilityscores.skillsproficiency.perception) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.perception, props.metadata.abilityscores.base.wisdom, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Cha</td>
    				<td className='label'>Performance {(props.metadata.abilityscores.skillsproficiency.performance) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.performance, props.metadata.abilityscores.base.charisma, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Cha</td>
    				<td className='label'>Persuasion {(props.metadata.abilityscores.skillsproficiency.persuasion) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.persuasion, props.metadata.abilityscores.base.charisma, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Int</td>
    				<td className='label'>Religion {(props.metadata.abilityscores.skillsproficiency.religion) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.religion, props.metadata.abilityscores.base.intelligence, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Dex</td>
    				<td className='label'>Sleight of Hand {(props.metadata.abilityscores.skillsproficiency.sleightofhand) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.sleightofhand, props.metadata.abilityscores.base.dexterity, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Dex</td>
    				<td className='label'>Stealth {(props.metadata.abilityscores.skillsproficiency.stealth) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.stealth, props.metadata.abilityscores.base.dexterity, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    			<tr>
            <td className='label'>Wis</td>
    				<td className='label'>Survival {(props.metadata.abilityscores.skillsproficiency.survival) ? <span className='proficiencyIndicator'>(P)</span> : ''	}</td>
    				<td>{getSkillMod(props.metadata.abilityscores.skillsproficiency.survival, props.metadata.abilityscores.base.wisdom, getProficiencyBonus(props.metadata.classes))}</td>
    			</tr>
    		</tbody>
    	</table>
    </div>


    {/* GENERAL SKILLS AND PROFICIENCIES */}
    <div>
      <h3>Proficiencies</h3>
      <h4>Amor</h4>
      { getProficiencyList((props.metadata.proficiencies.armor).split(','), 'Armor') }

      <h4>Weapons</h4>
      { getProficiencyList((props.metadata.proficiencies.weapons).split(','), 'Weapons') }

      <h4>Tools</h4>
      { getProficiencyList((props.metadata.proficiencies.tools).split(','), 'Tools') }

      <h4>Languages</h4>
      { getProficiencyList((props.metadata.proficiencies.languages).split(','), 'Languages') }
    </div>



    {/* GENERAL SKILLS AND PROFICIENCIES */}
    <div>
      <h3>Background</h3>
      <h4>Description</h4>
      <br />
      { getDescription(props.metadata.background) }

      <h4>History</h4>
      { getBackstory(props.metadata.background.history.split('\n')) }


    </div>

    <ul className='todoList'>
      TODO:
      <li className='checked'>Basic stuff, like AC and initiative</li>
      <li>weapons (name, attack bonus, damage bonus, link to item)</li>
      <li className='checked'>ability scores (dex, con, str, etc., plus proficiency signifier, maybe just a (P))</li>
      <li className='checked'>skills (animal handling, etc., with proficiency signifier)</li>
      <li className='checked'>proficiencies (tools n' stuff)</li>
      <li className='l2 checked'>tools</li>
      <li className='l2 checked'>armor</li>
      <li className='l2 checked'>languages</li>
      <li className='l2 checked'>weapons</li>
      <li>background (this should be editable)</li>
      <li className='l2 checked'>description</li>
      <li className='l2 checked'>Name, age, weight, race, general desc</li>
      <li className='l2 checked'>backstory</li>
      <li className='l2'>add a section</li>
    </ul>

    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </section>
)

export default SectionReference
