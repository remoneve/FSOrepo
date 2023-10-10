import { useEffect, useState } from 'react'
import peopleService from './services/people'

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [actionMessage, setActionMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    peopleService
      .getAll()
      .then(response => {
        setPeople(response.data)
    })
  },[])
  
  /* handlers */
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  /* adding, updating and removing persons from people */
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (people.map(people => people.name).includes(newPerson.name)) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        let id = 0
        for (let i = 0; i < people.length; i++) {
          if (people[i].name === newPerson.name) id = people[i].id
        }

        peopleService
        .update(id, newPerson)
        .then(response => {
          setPeople(people.map(person => person.id !== id ? person : response.data))
          setNewName('')
          setNewNumber('')
          setActionMessage(`Edited ${newPerson.name}`)
          setTimeout(() => {
            setActionMessage(null)
          }, 5000)
        })
      }
    }

    else {
      peopleService
        .create(newPerson)
        .then(response => {
          setPeople(people.concat(response.data))
          setNewName('')
          setNewNumber('')
          setActionMessage(`${newPerson.name} added`)
          setTimeout(() => {
            setActionMessage(null)
          }, 5000)
        })
        }
    }

  const removePerson = (person) => {
    const deletedId = person.id
    if (window.confirm(`Delete ${person.name}`)) {
      peopleService
      .remove(person.id)
      .then(console.log(`Deleted ${person.name}`))
      .then(() => {
        setPeople(people.filter(person => person.id !== deletedId))
        setActionMessage(`${person.name} removed`)
        setTimeout(() => { setActionMessage(null) }, 5000)
      })

      .catch(() => {
        setActionMessage(`${person.name} has already been removed from server`)
        setPeople(people.filter(person => person.id !== deletedId))
        setTimeout(() => { setActionMessage(null) }, 5000)
        setIsError(true)
      })
    }     
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={actionMessage} error={isError}/>
      <FilterInput filter={nameFilter} handler={handleFilterChange}/>
      <h2>add a new</h2>
      <AddingForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>    
      <ListPeople people={FilterList(people, nameFilter)} onButtonPress={removePerson}/>
    </div>
  )
}

const Notification = ({message, error}) => {
  if (message === null) return null

  if (error) {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  return (
    <div className='message'>
      {message}
    </div>
  )
}

/* Form for adding a new person/number */
const AddingForm = ({addPerson, newName, newNumber, handleNumberChange, handleNameChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName}
        onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber}
        onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

/* Input for filtering list */
const FilterInput = ({filter, handler}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handler}/>
    </div>
  )
}

/* filtering listed people */
const FilterList = (people, nameFilter) => {
  const filteredList = people.map(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))  
  ? people.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
  : people
  return (filteredList)
}

/* listing persons/numbers in people */
const ListPeople = ({people, onButtonPress}) => {
  return (
    <div>{people.map(person => <Person key={person.id} person={person} onButtonPress={onButtonPress}/>)}</div>
  )
}

/* printing one singular person */
const Person = ({person, onButtonPress}) => {
  return(
    <p>{person.name} {person.number} <button onClick={() => onButtonPress(person)}>delete</button></p>
  )
}

export default App