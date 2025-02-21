const Person = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => (
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
)

export default Person