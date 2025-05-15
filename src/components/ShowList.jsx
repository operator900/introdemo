const ShowList = ({filteredPersons, onClick}) => {
    return (
        <ul>
            {filteredPersons.map((person) => (
                <li key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => onClick(person.id)}>delete</button>
                </li> 
            ))}
        </ul>
    )
}

export default ShowList