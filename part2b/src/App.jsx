import { useState } from 'react'
import Search from './components/Filter'
import Person from './components/Person'
import Show from './components/Show'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [search, setSearch] = useState('')

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
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {      
    setNewNumber(event.target.value)  
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filtered = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} handleSearchChange={handleSearchChange}></Search>
      <h2>add a new</h2>
      <Person addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}></Person>
      <h2>Numbers</h2>
      <Show filtered={filtered}></Show>
      </div>
  )
}

export default App