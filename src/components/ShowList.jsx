import Button from './Button'

const ShowList = ({filteredPersons}) => {
    return (
        <ul>
            {filteredPersons.map((person) => (
                <li key={person.id}>
                    {person.name} {person.number}
                    <Button text="delete" />
                </li>
            ))}
        </ul>
    )
}

export default ShowList