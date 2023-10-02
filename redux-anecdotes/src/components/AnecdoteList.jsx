import {useSelector, useDispatch} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`you voted for '${anecdotes.find(a => a.id === id).content}'`, 5))
    }

    const anecdotes = useSelector(state => {
        const filter = state.filter
        const sortedAnecdotes = [...state.anecdotes].sort((a, b) => b.votes - a.votes)
        if (filter === '') {
          return sortedAnecdotes
        }
        return sortedAnecdotes.filter(anecdote =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      })

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList