const Search = ({search, handleSearchChange}) => (
    <div>filter shown with:
      <input value={search} onChange={handleSearchChange} />
    </div>
)

export default Search