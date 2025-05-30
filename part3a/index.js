const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(`dist`))

//MONGO DATABASE SECTION
const mongoose = require('mongoose')
const password = `3LwkrV6AF5isrr2W`;
const url = `mongodb+srv://vqev22:${password}@cluster0.xerewno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url) 
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const PhonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

PhonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Phonebook = mongoose.model('Phonebook', PhonebookSchema)

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(persons => {
    response.json(persons)
  })
})

//MORGAN SECTION
morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});
app.use(morgan(':method :url :status :response-time ms - :body'));

app.get('/api/persons/:id', (request, response) => {
  Phonebook.findById(request.params.id)
    .then(person => {
      if(person){
        res.json(person)
      }else{
        response.status(404).json({error: 'Person not found' })
      }
    })
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'Name and number are required' })
  }

  Phonebook.findOne({ name })
    .then(existingPerson => {
      if (existingPerson) {
        return response.status(400).json({ error: 'Name must be unique' })
      }

      const person = new Phonebook({ name, number })
      person.save()
        .then(savedPerson => {
          response.status(201).json(savedPerson)
        })
    })
})