const Show = ({filtered}) => (
    <div>{filtered.map(person =><li key={person.id}>{person.name} {person.number}</li>)}</div>
)

export default Show