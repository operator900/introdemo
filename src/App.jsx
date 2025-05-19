import { useState } from 'react'
import Header2 from './components/Header'
import Form from './components/Form'
import ShowList from './components/ShowList'
import { useEffect } from 'react'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data')
        setTimeout(() => {
          setError(null)
        }, 5000)
        
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
          setNotification(`Updated ${returnedPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }
          , 5000)
        })
        .catch(error => {
          console.error('Error updating data:', error)
          setError(`Information of ${nameObject.name} has already been removed from server`)
          setTimeout(() => {
            setError(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
          setFilteredPersons(persons.filter(p => p.id !== person.id))
          setNewName('')
          setNewNumber('')
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
          setNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.error('Error creating data:', error)
          setError('Failed to create data')
          setTimeout(() => {
            setError(null)
          }, 5000)
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

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    console.log('Person to delete:', person)
    
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setFilteredPersons(persons.filter(p => p.id !== id))
          setNotification(`Deleted ${person.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.error('Error deleting data:', error)
          setError(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setError(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
          setFilteredPersons(persons.filter(p => p.id !== id))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  const handleDelete = (id) => {
    deletePerson(id)
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
        submitType={addPerson}
        />
      <Form
        text="number" 
        variable={newNumber} 
        functionVar={handleNumberChange}
        submitType={() => false}/>
      <Notification message={notification} error={error}/>
      <Header2 text="Numbers"/>
      <ShowList filteredPersons={filteredPersons} onClick={handleDelete}/>
    </div>
  )
}

export default App