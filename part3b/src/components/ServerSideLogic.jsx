import axios from "axios";
const baseURL = "/api/persons";

const getPersons = () => {
  return axios.get(baseURL).then(response => response.data);
};

const addPerson = (newName, newNumber) => {
  const newPerson = { name: newName, number: newNumber };
  return axios.post(baseURL, newPerson).then(response => response.data);
};

// const deletePerson = (id) => {npm 
//   return axios.delete(`http://localhost:3001/persons/${id}`)
//     .then(() => {
//       console.log(`Person with ID ${id} deleted successfully.`);
//     })
//     .catch(error => {
//       console.error('Error deleting person:', error);
//       alert('Failed to delete the person');
//     });
// };

// const updateNumber = (id, newNumber) => {
//   return axios.patch(`http://localhost:3001/persons/${id}`, {
//     number: newNumber
//   }).then(response => {
//     return response.data;
//   })
//   .catch(error => {
//     console.error('Error updating resource:', error);
//   });
// }

export default { getPersons, addPerson/*, deletePerson, updateNumber*/ };