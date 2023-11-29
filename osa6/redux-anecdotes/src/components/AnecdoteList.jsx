import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const ListAnecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => 
    state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())))

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }
  
  const sort = (anecdotes) => {
    const array = anecdotes.sort((a, b) => b.votes - a.votes)
  
  return array.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
    )
  }

  return (
    <div>
      {sort(anecdotes)}
    </div>  
  )
}

export default ListAnecdotes