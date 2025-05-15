import { useState } from 'react'
import Header2 from './components/Header'
import Form from './components/Form'
import ShowList from './components/ShowList'
import axios from 'axios'
import { useEffect } from 'react'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  
  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    console.log(nameObject);
    
    if (alreadyExists(nameObject.name)) {
      const person = persons.find(p => p.name === nameObject.name)
      console.log('Person already exists:', person);
      
      const updatedPerson = { ...person, number: newNumber }
      console.log('Updated person:', updatedPerson);

      if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        phonebookService
        .update(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => (p.id !== person.id ? p : returnedPerson)))
          setFilteredPersons(persons.map(p => (p.id !== person.id ? p : returnedPerson)))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('Error updating data:', error)
        })
      }
    }
    else {
      phonebookService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('Error creating data:', error)
        })
    }
  }
  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    const search = event.target.value
    setSearch(search)
   const filteredPersons = persons.filter((person) => {
      return person.name.toLowerCase().includes(search.toLowerCase())
    })
    setFilteredPersons(filteredPersons)

  }
  const alreadyExists = (name) => {
    return persons.some((person) => person.name.toLowerCase() === name.toLowerCase())
  }

  return (
    <div>
      <Header2 text="Phonebook"/>
      <Form 
        text="filter shown with" 
        variable={search} 
        functionVar={handleSearch}
        buttonType={"submit"}
        buttonSearchText={"search"}
        submitType={() => false}/>

      <Header2 text="add a new"/>
      <Form 
        text="name" 
        variable={newName} 
        functionVar={handleNameChange}
        buttonType={"submit"}
        buttonSearchText={"add"}
        submitType={addPerson}/>
      <Form
        text="number" 
        variable={newNumber} 
        functionVar={handleNumberChange}
        submitType={() => false}/>

      <Header2 text="Numbers"/>
      <ShowList filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App