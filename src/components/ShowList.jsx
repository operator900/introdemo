import phonebookService from "../services/phonebook"

const ShowList = ({filteredPersons}) => {
    return (
        <ul>
            {filteredPersons.map((person) => (
                <li key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => {
                        if (window.confirm(`Delete ${person.name}?`)) {
                            phonebookService
                                .remove(person.id)
                                .then(() => {
                                    setPersons(persons.filter(p => p.id !== person.id))
                                    setFilteredPersons(persons.filter(p => p.id !== person.id))
                                })
                                .catch(error => {
                                    console.error('Error deleting data:', error)
                                })
                        }
                    }}>delete</button>
                </li>
            ))}
        </ul>
    )
}

export default ShowList