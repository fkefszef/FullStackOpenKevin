import { useState, useEffect } from 'react';
import Search from './components/Filter';
import Person from './components/Person';
import Show from './components/Show';
import BackEnd from './components/ServerSideLogic';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    BackEnd.getPersons()
      .then(data => {
        setPersons(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

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
        setErrorMessage(`Added ${newName}`);
      })
      .catch(error => {
        console.error('Error adding new person: ', error);
      });
  };

  const updateNumber = (newName, newNumber) => {
    if (persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        BackEnd.updateNumber(person.id, newNumber).then((updated) => {
          setPersons(persons.map(p => p.id !== updated.id ? p : updated))
          setErrorMessage(`Number updated for ${person.name}`)
        })
      }
    }
  }

  const deletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const personToDelete = persons.find(person => person.id === id);
      BackEnd.deletePerson(id).then(() => {
        setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
          setErrorMessage(`Information of ${personToDelete.name} has already been removed from server`);
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
      <Notification errorMessage={errorMessage}/>
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
