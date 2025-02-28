import { useState, useEffect } from 'react';
import Search from './components/Filter';
import Person from './components/Person';
import Show from './components/Show';
import BackEnd from './components/ServerSideLogic';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  // Fetch persons using BackEnd.getPersons()
  useEffect(() => {
    BackEnd.getPersons()
      .then(data => {
        setPersons(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  // Add a new name using BackEnd.addPerson()
  const addName = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      updateNumber(newName, newNumber);
      return;
    }

    BackEnd.addPerson(newName, newNumber)
      .then(data => {
        setPersons(persons.concat(data));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error('Error adding new person: ', error);
      });
  };

  const updateNumber = (newName, newNumber) => {
    if (persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        const updatedPerson = {...person, number: newNumber}
        BackEnd.updateNumber(person.id, newNumber).then(() => {
          setPersons(persons.map(p => p.id !== updated.id ? p : updated))
        })
      }
    }
  }

  const deletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      BackEnd.deletePerson(id).then(() => {
        setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <Person
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Show filtered={filtered} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;
