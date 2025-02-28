import axios from "axios";

const getPersons = () => {
  return axios.get('http://localhost:3001/persons').then(response => response.data);
};

const addPerson = (newName, newNumber) => {
  const newPerson = { name: newName, number: newNumber };
  return axios.post('http://localhost:3001/persons', newPerson).then(response => response.data);
};

export default { getPersons, addPerson };
