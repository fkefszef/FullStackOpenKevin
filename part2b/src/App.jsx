import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    
    const newPerson = {name: newName}
    setPersons(persons.concat(newPerson))
    setNewName('')

    console.log(persons)
  }
  
  const handleNameChange = (event) => {      
    setNewName(event.target.value)  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person =><li>{person.name}</li>)}</div>
      </div>
  )
}

export default App