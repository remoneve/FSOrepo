import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const textFilter = (event) => {
    console.log(event.target.value)
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      filter <input name="filter" onChange={textFilter}/> 
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App