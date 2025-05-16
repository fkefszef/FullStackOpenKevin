const express = require('express')
const app = express()
app.use(express.json())

var morgan = require('morgan')


morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});
app.use(morgan(':method :url :status :response-time ms - :body'));

const phonebookData = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(phonebookData)
})

app.get('/info', (request, response) => {
    response.send(
    `<div>
      <p>Phonebook has info for ${phonebookData.length} people</p>
      <p>${new Date()}</p>
    </div>`
    )
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = phonebookData.find(p => p.id === id);
  if(person != null){
    response.json(person)
  }else{
    response.status(404).json({error: 'Person not found' })
  }
})

// Corrected DELETE 
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const index = phonebookData.find(p => p.id === id);
  if(index !== -1){
    phonebookData.splice(index, 1);
    response.status(204).end();
  }else{
    response.status(404).json({error: 'Person not found' })
  }
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.post('/api/persons', (request, response) => {
  const person = request.body;
  const randomId = (Math.random() * 10000).toFixed(0);
  const index = phonebookData.find(p => p.id === randomId);
  const name = phonebookData.find(p => p.name === person.name);
  const number = phonebookData.find(p => p.number === person.number);
  if(index){return response.status(400).json({ error: 'id must be unique' });}
  if(name){return response.status(400).json({ error: 'name must be unique' });}
  if(number){return response.status(400).json({ error: 'number must be unique' });}
  const newPerson = {id: randomId, ...person};
  phonebookData.push(newPerson);
  response.status(201).json(newPerson);
})