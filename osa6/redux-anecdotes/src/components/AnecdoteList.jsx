import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const ListAnecdotes = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  
  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }
  
  const sort = (anecdotes) => {
    const b = anecdotes.sort((a, b) => b.votes - a.votes)
  
  return b.map(anecdote =>
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