import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      number: '666-666-666'
    }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {name: newName, number: newNumber}
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('');

    console.log(persons)
  }
  
  const handleNameChange = (event) => {      
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {      
    setNewNumber(event.target.value)  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        <div> 
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person =><li>{person.name} {person.number}</li>)}</div>
      </div>
  )
}

export default App