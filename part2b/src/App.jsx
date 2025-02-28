import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Filter'
import Person from './components/Person'
import Show from './components/Show'
import BackEnd from './components/ServerSideLogic'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  BackEnd.useEffect();
  BackEnd.addName();


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <Person
        addName={BackEnd.addName()}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Show filtered={filtered} />
    </div>
  )
}

export default App
